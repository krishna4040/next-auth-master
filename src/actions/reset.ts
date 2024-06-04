"use server"

import { getUserByEmail } from '@/data/user'
import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/tokens'
import { ResetSchema } from '@/schemas'
import {z} from 'zod'

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validateFields = ResetSchema.safeParse(values)
    if (!validateFields.success) return {error: "Invalid email!"}

    const {email} = validateFields.data
    const existingUser = await getUserByEmail(email);
    if (!existingUser) return {error: "Email not found!"} 

    const passwordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)

    return {success: "Reset email sent!"}
}