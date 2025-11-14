import { NextRequest, NextResponse } from "next/server";
import { getArticles } from "@/lib/articles";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { createArticle } from "@/lib/articles";
import { Article } from "@/lib/article_type";
import { z } from "zod";

const articleSchema = z.object({
    day: z.number().min(1).max(25),
    author: z.string().min(1, "著者名は必須です。").max(100, "著者名は100文字以内で入力してください。"),
    author_link: z.union([z.url({ message: "著者リンクは有効なURLである必要があります。" }), z.literal("")]).optional(),
    iconUrl: z.union([z.url({ message: "アイコンURLは有効なURLである必要があります。" }), z.literal("")]).optional(),
    title: z.string().min(1, "タイトルは必須です。").max(200, "タイトルは200文字以内で入力してください。"),
    link: z.url({ message: "記事リンクは有効なURLである必要があります。" }),
    description: z.string().max(500, "説明文は500文字以内で入力してください。").optional(),
});

export async function GET() {
    const articles = await getArticles();

    const now = new Date();
    const publishedArticles = articles.filter((article: Article) => {
        const articleDate = new Date(now.getFullYear(), 11, article.day, 0, 0, 0); // December is month 11
        return now >= articleDate;
    });

    return NextResponse.json(publishedArticles);
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "認証が必要です。" }, { status: 401 });
        }
        if (!session?.user.canPost) {
            return NextResponse.json({ error: "記事投稿権限がありません。" }, { status: 403 });
        }

        const body = await request.json();
        const validatedResult = articleSchema.safeParse(body);
        if (!validatedResult.success) {
            const errors = validatedResult.error.issues.map(err => ({
                field: err.path.join('.'),
                message: err.message
            }));
            return NextResponse.json({
                error: "入力データが不正です",
                details: errors
            }, { status: 400 });
        }

        const { day, author, author_link, iconUrl, title, link, description } = validatedResult.data;
        const article = await createArticle({ day, author, author_link, iconUrl, title, link, description });

        return NextResponse.json(
            { message: "記事が正常に作成されました。", article },
            { status: 201 }
        );
    } catch (error) {
        console.error("記事作成中にエラーが発生しました:", error);
        return NextResponse.json(
            { error: "記事作成中にエラーが発生しました。" },
            { status: 500 }
        )
    }
}