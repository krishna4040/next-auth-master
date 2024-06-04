import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`
    await resend.emails.send({
        from: "krishnajain5050@gmail.com",
        to: email,
        subject: "Verify your email address",
        html: `<p>Verify your email address by clicking <a href="${confirmLink}">here</a></p>`
    })
}