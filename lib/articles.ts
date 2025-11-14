'use server'

import { prisma } from './prisma';

export async function getArticles() {
    return await prisma.article.findMany({
        orderBy: { day: 'asc' }
    })
}

export async function getArticleByDay(day: number) {
    return await prisma.article.findMany({
        where: { day },
        orderBy: { createdAt: 'asc' }
    })
}

export async function createArticle(data: {
    day: number, author: string, author_link?: string, iconUrl?: string, title: string,
    link: string, description?: string
}) {
    return await prisma.article.create({
        data: {
            day: data.day,
            author: data.author,
            author_link: data.author_link ?? null,
            iconUrl: data.iconUrl ?? null,
            title: data.title,
            link: data.link,
            description: data.description ?? '',
        }
    })
}