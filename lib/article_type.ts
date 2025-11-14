type Article = {
    id: number;
    day: number;
    author: string;
    author_link: string | null;
    iconUrl: string | null;
    title: string;
    link: string;
    description: string;
};

type Icon = {
    id: number; day: number; author: string; iconUrl: string | null;
}

export type { Article };
export type { Icon };