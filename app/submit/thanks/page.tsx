
export default function ThanksPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-amber-100 px-4">
            <h1 className="text-2xl font-bold mb-4">記事の投稿ありがとうございます！</h1>
            <div className="flex ">
                <a href="/submit" className="mr-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"> 別の記事を投稿する</a>

                <a href="/" className="ml-4 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"> ホームに戻る</a>
            </div>
        </div>
    );
}