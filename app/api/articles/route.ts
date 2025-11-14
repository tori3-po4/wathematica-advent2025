import { NextRequest, NextResponse } from "next/server";
import { getArticles } from "@/lib/articles";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { createArticle } from "@/lib/articles";
import { Article } from "@/lib/article_type";

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
        const { day, author, author_link, iconUrl, title, link, description } = body;
        if (!day || !author || !title || !link) {
            return NextResponse.json({ error: "必須フィールドが不足しています。" }, { status: 400 });
        }
        if (day < 1 || day > 25) {
            return NextResponse.json({ error: "日付は1から25の間で指定してください。" }, { status: 400 });
        }

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