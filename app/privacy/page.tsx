
export default function PrivacyPage() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-8 ">
            <h1 className="text-3xl font-bold mb-6">プライバシーポリシー</h1>
            <section className="mb-6 ">
                <h2 className="text-2xl font-semibold mb-3">Googleアナリティクスの利用について</h2>
                <p className="mt-2">
                    当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
                    Googleアナリティクスはトラフィックデータの収集のためにCookieを使用します。
                    これらのデータは匿名で収集されており、個人を特定するものではありません。
                    当サイトではこの情報を、閲覧数や利用傾向を把握し、今後のコンテンツ改善やイベント運営に活かす目的で使用します。
                    <br />
                    なお、ユーザーはブラウザ設定でCookieを無効にすることができます。
                    <br />
                    詳細については、以下のリンクをご参照ください。
                </p>
                <ul className="list-disc list-inside mt-2">
                    <li>
                        <a href="https://marketingplatform.google.com/about/analytics/terms/jp/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                            Googleアナリティクス利用規約
                        </a>
                    </li>
                    <li>
                        <a href="https://policies.google.com/privacy?hl=ja" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                            Googleプライバシーポリシー
                        </a>
                    </li>
                </ul>
            </section>
        </main >
    );
}