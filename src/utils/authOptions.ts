import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    pages: {
        signIn: '/auth/signin'
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            if (url.includes('/auth/signin')) {
                return baseUrl;
            }
            if (url.startsWith("/")) {
                return `${baseUrl}${url}`;
            }
            try {
                const urlObj = new URL(url);
                if (urlObj.origin === baseUrl) {
                    return url;
                }
            } catch {
            }
            return baseUrl;
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}

