import NextAuth from "next-auth"
import authConfig from '@/auth.config'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'
import { getUserById } from "./data/user"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"
import { getAccountByUserId } from "./data/account"

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    callbacks: {
        signIn: async ({ user, account }) => {
            // Allow oAuth without email verification
            if (account?.provider !== "credentials") return true

            if (!user.id) {
                return false
            }

            // Prevent sign in without email verification
            const existingUser = await getUserById(user.id)
            if (!existingUser || !existingUser.emailVerified) {
                return false
            }

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
                if (!twoFactorConfirmation) {
                    return false
                }
                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id }
                })
            }

            return true
        },
        session: async ({ session, token }) => {
            if (session.user && token.sub) {
                session.user.id = token.sub
            }

            if (session.user && token.role) {
                session.user.role = token.role
            }

            if (token.isTwoFactorEnabled && session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
            }

            if (session.user) {
                session.user.name = token.name
                session.user.email = token.email as string
                session.user.isOAuth = token.isOAuth as boolean
            }

            return session
        },
        jwt: async ({ token }) => {
            if (!token.sub) return token
            const existingUser = await getUserById(token.sub)
            if (!existingUser) return token

            const account = await getAccountByUserId(existingUser.id)

            token.isOAuth = !!account
            token.name = existingUser.name
            token.email = existingUser.email
            token.role = existingUser.role
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/auth/login',
        signOut: '/auth/error'
    },
    events: {
        linkAccount: async ({ user }) => {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    }
})