'use client';
import { useState, useEffect } from "react";

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        setCurrentDate(new Date());
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

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

                    i

                    return isPublished ? (
                        <a key={i} href={`#day-${i + 1}`} className="aspect-square  rounded-xl flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                            <span className="text-2xl font-bold">{i + 1}</span>
                        </a>
                    ) : (<div
                        key={i}
                        className="aspect-square  rounded-lg flex items-center justify-center opacity-40 cursor-not-allowed bg-gray-100 relative"
                    >
                        <span className="text-2xl font-bold text-gray-400">{day}</span>
                        <span className="absolute top-1 right-1 text-xs">🔒</span>
                    </div>);
                })}
            </div>
        </div>
    )
}