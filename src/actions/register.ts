"use server"

import { z } from "zod"
import { RegisterSchema } from '@/schemas'
import bcrypt from 'bcrypt'
import {db} from '@/lib/db'
import { getUserByEmail } from "@/data/user"

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

    //TODO Send verification token message

    return {
        success: "Email Sent!!"
    }
}