import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
        // ...add more providers here
    ],

    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: ({ token, user, account, profile, isNewUser }) => {
            // console.log({ token, user, account, profile })
            if (account?.access_token) {
                token.accessToken = account.id_token;
            }
            return token;
        },
        session: async ({ session, user, token }) => {
            session.user = user;
            session.token = token;
            return session
        }
    },
}

export default NextAuth(authOptions)