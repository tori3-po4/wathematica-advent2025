
export default function ArticleList() {
    return (
        <div className="mt-8 flex items-center justify-center">
            <ul className="space-y-6">
                <Article_Item
                    title="記事タイトル1"
                    link="#"
                    description="この記事はWathematica Advent Calendar 2025の一部です。" />
                <Article_Item
                    title="記事タイトル2"
                    link="#"
                    description="この記事はWathematica Advent Calendar 2025の一部です。" />
                <Article_Item
                    title="記事タイトル3"
                    link="#"
                    description="この記事はWathematica Advent Calendar 2025の一部です。" />
            </ul>
        </div>
    )
}

function Article_Item({ title, link, description }: { title: string; link: string; description: string }) {
    return (
        <>
            <li className="pb-2 flex items-center space-x-4 p-4 hover:shadow-lg transition-shadow duration-300 ">
                <span className="text-lg font-bold">12/01</span>
                <img src="/wathematica_logo.png" alt="icon" className="h-16 w-16 rounded-full" />
                <div className="flex-1">
                    <a href={link} className="font-semibold">{title}</a>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
            </li>
        </>
    )
}