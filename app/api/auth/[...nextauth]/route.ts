import NextAuth, { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

// 許可するDiscordギルド(サーバー)のID
const ALLOWED_GUILD_ID = process.env.ALLOWED_GUILD_ID || "";

interface DiscordGuild {
    id: string;
    name: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
            authorization: {
                params: { scope: 'identify email guilds' },
            },
        }),
    ],
    session: { strategy: 'jwt' },
    callbacks: {
        async jwt({ token, account, profile }) {
            // DiscordのアクセストークンとユーザーIDをJWTに保存
            if (account?.access_token) {
                token.accessToken = account.access_token;
            }
            if (profile) {
                token.id = (profile as { id: string }).id;
            }
            return token;
        },
        async session({ session, token }) {
            // セッションにアクセストークンとユーザーIDを追加
            if (token.accessToken) {
                session.accessToken = token.accessToken as string;
            }
            if (token.id) {
                session.user.id = token.id as string;
            }

            // ユーザーのギルド一覧を取得して権限をチェック
            if (token.accessToken) {
                try {
                    const response = await fetch('https://discord.com/api/users/@me/guilds', {
                        headers: {
                            Authorization: `Bearer ${token.accessToken}`,
                        },
                    });

                    if (response.ok) {
                        const guilds: DiscordGuild[] = await response.json();
                        const isInAllowedGuild = guilds.some(
                            (guild) => guild.id === ALLOWED_GUILD_ID
                        );

                        // セッションに権限情報を追加
                        session.user.canPost = isInAllowedGuild;
                        session.user.guilds = guilds.map((g) => ({
                            id: g.id,
                            name: g.name,
                        }));
                    }
                } catch (error) {
                    console.error('Failed to fetch Discord guilds:', error);
                    session.user.canPost = false;
                }
            }

            return session;
        },
        // ログイン時に特定のギルドに所属しているかチェック
        async signIn({ account }) {
            if (!account?.access_token) {
                return false;
            }

            // ギルドIDが設定されていない場合はすべてのユーザーを許可
            if (!ALLOWED_GUILD_ID) {
                return true;
            }

            try {
                const response = await fetch('https://discord.com/api/users/@me/guilds', {
                    headers: {
                        Authorization: `Bearer ${account.access_token}`,
                    },
                });

                if (response.ok) {
                    const guilds: DiscordGuild[] = await response.json();
                    return guilds.some((guild) => guild.id === ALLOWED_GUILD_ID);
                }
            } catch (error) {
                console.error('Failed to verify guild membership:', error);
            }

            return false;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };