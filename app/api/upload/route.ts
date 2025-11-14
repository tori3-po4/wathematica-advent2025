import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "認証が必要です。" }, { status: 401 });
        }
        if (!session?.user.canPost) {
            return NextResponse.json({ error: "アップロード権限がありません。" }, { status: 403 });
        }

        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "ファイルが選択されていません。" }, { status: 400 });
        }

        // ファイルサイズチェック (例: 5MB制限)
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({ error: "ファイルサイズが大きすぎます。5MB以下にしてください。" }, { status: 400 });
        }

        // ファイルタイプチェック
        const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: "サポートされていないファイル形式です。" }, { status: 400 });
        }

        const fileExtension = file.name.split('.').pop();
        const timestamp = Date.now(); // 例: 1699876543210
        const newFileName = `${timestamp}.${fileExtension}`;


        // Vercel Blobにアップロード
        const blob = await put(newFileName, file, {
            access: "public",
        });

        return NextResponse.json({ url: blob.url }, { status: 200 });
    } catch (error) {
        console.error("ファイルアップロード中にエラーが発生しました:", error);
        return NextResponse.json(
            { error: "ファイルアップロード中にエラーが発生しました。" },
            { status: 500 }
        );
    }
}
