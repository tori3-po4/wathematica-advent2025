import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            canPost?: boolean;
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
