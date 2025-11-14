
import { useCurrentDay } from '../hooks/useCurrentDay';

const currentDate = new Date(2025, 11, 1);

export default function Calendar() {

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

                    return (<Daytag key={day} day={day} isunlocked={isPublished} />);
                })}
            </div>
        </div>
    )
}

export function Daytag({ day, isunlocked }: { day: number; isunlocked: boolean }) {
    return (
        isunlocked ? (
            <a key={day} href={`#day-${day}`} className="relative aspect-square md:rounded-xl rounded-sm hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                <span className="absolute md:top-6 md:left-6 md:text-2xl top-1 left-1 text-md font-bold">{day}</span>
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