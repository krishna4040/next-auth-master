"use client"
import { useForm } from "react-hook-form"
import CardWrapper from "./CardWrapper"
import * as z from "zod"
import { ResetSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "./FormError"
import { FormSuccess } from "./FormSucess"
import { useState, useTransition } from "react"
import { reset } from "@/actions/reset";

export const ResetForm = () => {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        }
    })

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError('')
        setSuccess('')
        startTransition(() => {
            reset(values).then(data => {
                setError(data?.error)
                setSuccess(data?.success)
            })
        })
    }


    return (
        <CardWrapper
            headerLabel="Forgot Password"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
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
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit" className="w-full" disabled={isPending}>
                        Send reset email
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}