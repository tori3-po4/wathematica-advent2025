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