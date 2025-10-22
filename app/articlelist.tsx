

export default function ArticleList({ currentDate }: { currentDate: Date }) {

    return (
        <div className="mt-8 flex items-center justify-center">
            <ul className="space-y-6">
                {Array.from({ length: 25 }, (_, i) => {
                    const day = i + 1;
                    const articleDate = new Date(2025, 11, day, 0, 0, 0);
                    //const isPublished = currentDate >= articleDate;
                    const isPublished = true;
                    if (!isPublished) return null;
                    return (
                        <Article_Item
                            key={i}
                            day={i + 1}
                            author={`著者名${i + 1}`}
                            title={`記事タイトル${i + 1}`}
                            link=""
                            description="この記事はWathematica Advent Calendar 2025の一部です。"
                        />
                    )
                })}
            </ul>
        </div>
    )
}

function Article_Item({ day, author, title, link, description }: { day: number; author: string; title: string; link: string; description: string }) {
    return (

        <li id={`day-${day}`} className="rounded-lg pb-2 flex items-center space-x-4 p-4 hover:shadow-lg transition-shadow duration-300 scroll-mt-20">
            <span className="text-lg font-bold">12/{day}</span>
            <Article author={author} title={title} link={link} description={description} />
        </li>
    );
}

function Article({ author, title, link, description }: { author: string; title: string; link: string; description: string }) {
    return (
        <div className="flex-1 flex space-x-4">
            <div className="flex flex-col items-center">
                <img src="/wathematica_logo.png" alt="icon" className="h-16 w-16 rounded-full" />
                <span className="text-xs text-gray-500 text-center mt-2">{author}</span>
            </div>
            <div className="flex-1">
                <a href={link} className="font-semibold text-xl hover:text-blue-400 hover:underline">{title}</a>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
    );
}