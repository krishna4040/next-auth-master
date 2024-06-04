import { db } from "@/lib/db"

export const getPasswordResetTokenByToken = async (token: string) => {
    try {
        const passwordToken = await db.passwordResetToken.findUnique({
            where: { token }
        })
        return passwordToken
    } catch (error) {
        return null
    }
}

export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findFirst({
            where: { email }
        })
        return passwordResetToken
    } catch (error) {
        return null
    }
}