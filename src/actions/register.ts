"use server"

import { z } from "zod"
import { RegisterSchema } from '@/schemas'
import bcrypt from 'bcrypt'
import {db} from '@/lib/db'
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)
    if (!validatedFields.success) {
        return {
            error: "Invalid Fields!!"
        }
    }

    const {email, password, name} = validatedFields.data
    const pwHash = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return {
            error: "User Already Exists!!"
        }
    }

    await db.user.create({
        data: {
            name,
            email,
            password: pwHash
        }
    })

    const VerificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(VerificationToken.email, VerificationToken.token)

    return {
        success: "Confirmation email sent!!"
    }
}