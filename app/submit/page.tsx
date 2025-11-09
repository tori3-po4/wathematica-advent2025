"use client";
import { useSession } from "next-auth/react"
import SubmitForm from "./form";

export default function SubmitPage() {
    const { data: session } = useSession();

    if (!session?.user.canPost) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-amber-100 px-4">
                <p className="text-red-600 text-lg font-semibold">記事投稿権限がありません。</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-amber-100 px-4">
            <SubmitForm />
        </div>
    );
}