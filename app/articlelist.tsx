'use client'
import { useCurrentDay } from '../hooks/useCurrentDay';
import { useEffect, useState } from 'react';
import { Article } from '@/lib/article_type';

export default function ArticleList() {
    const currentDay = useCurrentDay(new Date(2025, 11, 15, 0, 0, 0));
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        fetch('/api/articles')
            .then(res => res.json())
            .then(data => setArticles(data));
    }, []);

    return (
        <div className="mt-8 flex items-center justify-center">
            <ul className="space-y-6 w-full max-w-4xl px-4">
                {articles
                    .map((article) => {

                        return (
                            <Article_Item
                                key={article.id}
                                day={article.day}
                                author={article.author}
                                author_link={article.author_link}
                                title={article.title}
                                link={article.link}
                                description={article.description}
                            />
                        )
                    })}
            </ul>
        </div>
    )
}

function Article_Item({ day, author, author_link, title, link, description }: { day: number; author: string; author_link: string; title: string; link: string; description: string }) {
    return (

        <li id={`day-${day}`} className="rounded-lg pb-2 flex items-center space-x-4 p-4 hover:shadow-lg transition-shadow duration-300 scroll-mt-20 w-full">
            <span className="text-lg font-bold">12/{day}</span>
            <div className='transition-all duration-300 hover:scale-110 active:rotate-12 active:scale-95'>
                <a href={author_link} >
                    <img src="/wathematica_logo.png" alt="icon" className="h-16 w-16 rounded-full shadow-md hover:shadow-xl duration-300" />
                    <span className="text-xs text-gray-500 text-center mt-2 px-2">{author}</span>
                </a>
            </div>
            <div className="flex-1">
                <a href={link} className="font-semibold text-xl hover:text-blue-400 hover:underline">{title}</a>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </li>
    );
}