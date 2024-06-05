"use server"

import { getUserByEmail, getUserById } from "@/data/user"
import { currentUser } from "@/lib/current-user"
import { db } from "@/lib/db"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/tokens"
import { SettingsSchema } from "@/schemas"
import { z } from "zod"
import bcryptjs from 'bcryptjs'

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
    const user = await currentUser()
    if (!user || !user.id) {
        return { error: "Unauthorized" }
    }
    const dbUser = await getUserById(user.id)
    if (!dbUser) {
        return { error: "Unauthorized" }
    }

    if (user.isOAuth) {
        values.email = undefined
        values.password = undefined
        values.newPassword = undefined
        values.isTwoFactorEnabled = undefined
    }

    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email)
        if (existingUser && existingUser.id !== user.id) {
            return { error: "Email already in use!" }
        }
        const verificationToken = await generateVerificationToken(values.email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)
        return { success: "Verification email sent!" }
    }

    if (values.password && values.newPassword && dbUser.password) {
        const pwMatch = await bcryptjs.compare(values.password, dbUser.password)
        if (!pwMatch) {
            return { error: "Incorrect password!" }
        }
        const pwHash = await bcryptjs.hash(values.newPassword, 10)
        values.password = pwHash
        values.newPassword = undefined
    }

    await db.user.update({
        where: { id: dbUser.id },
        data: { ...values }
    })

    return {success: "Settings updated"}
}