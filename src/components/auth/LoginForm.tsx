"use client"
import { useForm } from "react-hook-form"
import CardWrapper from "./CardWrapper"
import * as z from "zod"
import { LoginSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "./FormError"
import { FormSuccess } from "./FormSucess"
import { useState, useTransition } from "react"
import { login } from "@/actions/login"
import { useSearchParams } from "next/navigation"

export const LoginForm = () => {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const searchParams = useSearchParams()

    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider" : ""

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError('')
        setSuccess('')
        startTransition(() => {
            login(values).then(data => {
                // setError(data?.error)
                // setSuccess(data.success)
            })
        })
    }


    return (
        <CardWrapper
            headerLabel="Welcome back"
            backButtonHref="/auth/register"
            backButtonLabel="Don't have an account?"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="JohnDoe@example.com"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button type="submit" className="w-full" disabled={isPending}>
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}