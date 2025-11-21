"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function AuthButton() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div className="fixed top-4 right-4 z-50">
                <div className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg">
                    読み込み中...
                </div>
            </div>
        );
    }

    if (session) {
        return (
            <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 items-end">
                <div className="bg-white rounded-lg shadow-md p-4 max-w-sm">
                    <div className="flex items-center gap-3 mb-2">
                        {session.user?.image && (
                            <img
                                src={session.user.image}
                                alt="プロフィール画像"
                                className="w-10 h-10 rounded-full"
                            />
                        )}
                        <div>
                            <p className="font-semibold text-sm">{session.user?.name}</p>
                            <p className="text-xs text-gray-500">{session.user?.email}</p>
                        </div>
                    </div>


                    {/* 投稿権限の表示 */}
                    <div className="mt-2 mb-3">
                        {session.user.canPost ? (
                            <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                ✓ 記事投稿権限あり
                            </span>
                        ) : (
                            <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                ✗ 記事投稿権限なし
                            </span>
                        )}
                    </div>

                    <button
                        onClick={() => signOut()}
                        className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                    >
                        ログアウト
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed top-4 right-4 z-50">
            <button
                onClick={() => signIn("discord")}
                className="px-6 py-3 bg-[#5865F2] text-white rounded-lg hover:bg-[#4752C4] transition-all duration-300 shadow-md hover:shadow-xl flex items-center gap-2 font-medium"
            >
                <Image src="/Discord-Symbol-White.svg" alt="Discord Icon" width={20} height={20} className="h-5 w-5" />
                Discordでログイン
            </button>
        </div>
    );
}
