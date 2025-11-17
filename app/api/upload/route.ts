import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { fileTypeFromBuffer } from "file-type";

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

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const fileType = await fileTypeFromBuffer(buffer);

        const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        if (!fileType || !allowedMimeTypes.includes(fileType.mime)) {
            return NextResponse.json({ error: "サポートされていないファイル形式です。" }, { status: 400 });
        }

        const fileExtension = fileType.ext;
        const randomstr = Math.random().toString(36).substring(2, 8);
        const timestamp = Date.now(); // 例: 1699876543210
        const newFileName = `${timestamp}_${randomstr}.${fileExtension}`;


        // Vercel Blobにアップロード
        const blob = await put(newFileName, file, {
            access: "public",
            contentType: fileType.mime,
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
