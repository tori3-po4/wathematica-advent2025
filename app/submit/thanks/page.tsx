
export default function ThanksPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-amber-100 px-4">
            <h1 className="text-2xl font-bold mb-4">記事の投稿ありがとうございます！</h1>
            <a href="/submit" className="text-blue-600 hover:underline"> 別の記事を投稿する</a>

            <a href="/" className="mt-2 text-blue-600 hover:underline"> ホームに戻る</a>
        </div>
    );
}