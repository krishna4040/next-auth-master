"use client"
import { useForm } from "react-hook-form"
import CardWrapper from "./CardWrapper"
import * as z from "zod"
import { NewPasswordSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "./FormError"
import { FormSuccess } from "./FormSucess"
import { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { newPassword } from "@/actions/new-password"

export const NewPasswordForm = () => {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const searchParams = useSearchParams()

    const token = searchParams.get('token')


    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError('')
        setSuccess('')
        startTransition(() => {
            newPassword(values, token).then(data => {
                setError(data.error)
                setSuccess(data.success)
            })
        })
    }


    return (
        <CardWrapper
            headerLabel="Create an account"
            backButtonHref="/auth/login"
            backButtonLabel="Already have an account?"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="********"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit" className="w-full" disabled={isPending}>
                        Reset password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}