'use client'

import { useState, useEffect } from 'react'

export function useCurrentDay(testDate?: Date): number {
    const [currentDay, setCurrentDay] = useState(new Date().getDate());

    useEffect(() => {
        if (!testDate) {

            const interval = setInterval(() => {
                setCurrentDay(new Date().getDate());
            }, 60000);

            return () => clearInterval(interval);
        }
    }, [testDate]);

    return currentDay;
}