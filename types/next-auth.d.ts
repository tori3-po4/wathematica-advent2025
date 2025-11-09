import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            canPost?: boolean;
            guilds?: Array<{ id: string; name: string }>;
        } & DefaultSession["user"];
        accessToken?: string;
    }

    interface JWT {
        id?: string;
        accessToken?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        accessToken?: string;
    }
}
