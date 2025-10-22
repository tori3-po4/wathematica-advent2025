'use client'

import { useState, useEffect } from 'react'

export function useCurrentDay(testDate?: Date): Date {
    const [currentDay, setCurrentDay] = useState(testDate || new Date());

    useEffect(() => {
        if (!testDate) {

            const interval = setInterval(() => {
                setCurrentDay(new Date());
            }, 60000);

            return () => clearInterval(interval);
        }
    }, [testDate]);

    return currentDay;
}