"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SubmitForm() {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [iconFile, setIconFile] = useState<File | null>(null);
    const [iconPreview, setIconPreview] = useState<string | null>(null);
    const [uploadingIcon, setUploadingIcon] = useState(false);

    const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setIconFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setIconPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setMessage(null);

        const formData = new FormData(event.currentTarget);

        // アイコン画像のアップロード
        let iconUrl: string | null = null;
        if (iconFile) {
            setUploadingIcon(true);
            try {
                const uploadFormData = new FormData();
                uploadFormData.append("file", iconFile);
                const uploadResponse = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadFormData,
                });
                if (uploadResponse.ok) {
                    const uploadResult = await uploadResponse.json();
                    iconUrl = uploadResult.url;
                } else {
                    const error = await uploadResponse.json();
                    setMessage({ type: "error", text: error.error || "画像のアップロードに失敗しました。" });
                    setLoading(false);
                    setUploadingIcon(false);
                    return;
                }
            } catch (error) {
                console.error(error);
                setMessage({ type: "error", text: "画像のアップロード中にエラーが発生しました。" });
                setLoading(false);
                setUploadingIcon(false);
                return;
            } finally {
                setUploadingIcon(false);
            }
        }

        const Data = {
            day: Number(formData.get("day")),
            author: formData.get("author") as string,
            author_link: formData.get("author_link") as string,
            iconUrl: iconUrl,
            title: formData.get("title") as string,
            link: formData.get("link") as string,
            description: formData.get("description") as string,
        }

        try {
            const response = await fetch('/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Data),
            });

            const result = await response.json();
            if (response.ok) {
                router.push('/submit/thanks');

            } else {
                setMessage({ type: "error", text: result.error || "記事の作成に失敗しました。" });
            }
        } catch (error) {
            console.error(error);
            setMessage({ type: "error", text: "記事の作成中にエラーが発生しました。" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">記事を投稿</h1>

            {message && (
                <div
                    className={`mb-4 p-4 rounded ${message.type === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="day" className="block text-sm font-medium text-gray-700 mb-2">
                        日付 (1-25) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        id="day"
                        name="day"
                        min="1"
                        max="25"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="1"
                    />
                </div>

                <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                        投稿者名 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        required
                        defaultValue={""}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="投稿者名を入力"
                    />
                </div>

                <div>
                    <label htmlFor="author_link" className="block text-sm font-medium text-gray-700 mb-2">
                        投稿者のリンク (Twitter、GitHubなど)
                    </label>
                    <input
                        type="url"
                        id="author_link"
                        name="author_link"
                        defaultValue={""}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://twitter.com/username"
                    />
                    <p className="text-xs text-gray-500 mt-1">SNSやポートフォリオのURLを入力してください</p>
                </div>

                <div>
                    <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-2">
                        アイコン画像 (任意)
                    </label>
                    <input
                        type="file"
                        id="icon"
                        name="icon"
                        accept="image/*"
                        onChange={handleIconChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">JPEG, PNG, GIF, WebP形式、5MB以下</p>
                    {iconPreview && (
                        <div className="mt-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">プレビュー:</p>
                            <img src={iconPreview} alt="アイコンプレビュー" className="h-24 w-24 rounded-full object-cover shadow-md" />
                        </div>
                    )}
                </div>

                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        タイトル <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="記事のタイトルを入力"
                    />
                </div>

                <div>
                    <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2">
                        記事のURL <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="url"
                        id="link"
                        name="link"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com/article"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        説明
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="記事の簡単な説明を入力（任意）"
                    />
                </div>


                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    {uploadingIcon ? "画像アップロード中..." : loading ? "投稿中..." : "投稿する"}
                </button>
            </form>
        </div>
    );
}