import NextAuth from "next-auth"
import authConfig from '@/auth.config'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'
import { getUserById } from "./data/user"

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    callbacks: {
        signIn: async ({user}) => {
            if (!user.id) {
                return false
            }
            const existingUser = await getUserById(user.id)
            if (!existingUser || !existingUser.emailVerified) {
                return false
            }
            return true
        },
        session: async ({session, token}) => {
            if (session.user && token.sub) {
                session.user.id = token.sub
            }

            if (session.user && token.role) {
                session.user.role = token.role
            }

            return session
        },
        jwt: async ({ token }) => {
            if (!token.sub) return token
            const existingUser = await getUserById(token.sub)
            if (!existingUser) return token
            token.role = existingUser.role
            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt',
    }
})