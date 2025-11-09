'use server'

import { prisma } from './prisma'

export async function getArticles() {
    return await prisma.article.findMany({
        orderBy: { day: 'asc' }
    })
}

export async function getArticleByDay(day: number) {
    return await prisma.article.findUnique({
        where: { day },
        orderBy: { createdAt: 'asc' }
    })
}

export async function createArticle(data: {
    day: number, author: string, author_link?: string, title: string,
    link: string, description?: string
}) {
    return await prisma.article.create({
        data
    })
}