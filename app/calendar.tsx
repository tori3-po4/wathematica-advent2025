
import { getArticleIcons } from "@/lib/articles";
import { Icon } from "@/lib/article_type";

const currentDate = new Date(2025, 11, 1);

export default async function Calendar() {

    const articles = await getArticleIcons();

    const dayIconMap = articles.reduce((acc: Record<number, Array<Icon>>, article: Icon) => {
        if (!acc[article.day]) {
            acc[article.day] = [];
        }
        acc[article.day].push(article);
        return acc;
    }, {} as Record<number, Array<Icon>>);

    return (
        <div className="container mx-auto">
            <ul className="grid grid-cols-7 gap-4 mb-2">
                <li className="text-center text-red-500">Sun</li>
                <li className="text-center">Mon</li>
                <li className="text-center">Tue</li>
                <li className="text-center">Wed</li>
                <li className="text-center">Thu</li>
                <li className="text-center">Fri</li>
                <li className="text-center text-blue-500">Sat</li>
            </ul>
            <hr />
            <div className="grid grid-cols-7 gap-4 mt-4">
                <div className="aspect-square "></div>
                {Array.from({ length: 25 }, (_, i) => {
                    const day = i + 1;
                    const articleDate = new Date(2025, 11, day, 0, 0, 0);
                    const isPublished = currentDate >= articleDate;
                    const dayIcons = dayIconMap[day] || [];

                    return (<Daytag key={day} day={day} isunlocked={isPublished} dayIcons={dayIcons} />);
                })}
            </div>
        </div>
    )
}

export function Daytag({ day, isunlocked, dayIcons }: { day: number; isunlocked: boolean; dayIcons: Array<Icon> }) {
    return (
        isunlocked ? (
            <a key={day} href={`#day-${day}`} className="relative aspect-square md:rounded-xl rounded-sm flex justify-center items-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                <span className="absolute md:top-6 md:left-6 md:text-2xl top-1 left-1 text-md font-bold">{day}</span>
                <div className="relative">
                    {dayIcons.length > 0 && (
                        <img className="rounded-full md:w-16 md:h-16 w-8 h-8"
                            src={dayIcons[0].iconUrl || '/wathema_icon.png'} />

                    )}
                    {dayIcons.length > 1 && (
                        <span className="absolute -top-1 -right-1 bg-gray-500 text-white rounded-full px-1.5 py-0.5 text-[10px] md:text-xs font-bold min-w-[18px] md:min-w-5 text-center leading-tight" >+{dayIcons.length - 1}</span>
                    )}
                </div>
            </a>
        ) : (
            <div
                key={null}
                className="relative aspect-square md:rounded-xl rounded-sm opacity-40 cursor-not-allowed bg-gray-100 "
            >
                <span className="absolute md:top-6 md:left-6 md:text-2xl top-1 left-1 text-md font-bold text-gray-400">{day}</span>
            </div>
        ));
}