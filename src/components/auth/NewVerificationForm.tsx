"use client"

import { useSearchParams } from "next/navigation"
import CardWrapper from "./CardWrapper"
import { BeatLoader } from 'react-spinners'
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/new-verification"
import { FormSuccess } from "./FormSucess"
import { FormError } from "./FormError"

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const onSubmit = useCallback(() => {
        if (success || error) {
            return
        }
        if (!token) {
            setError("Missing token!")
            return
        }
        newVerification(token)
            .then(data => {
                setSuccess(data?.success)
                setError(data?.error)
            })
            .catch(error => {
                setError(error.message)
            })
    }, [token, success, error])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    return <CardWrapper
        backButtonHref="/auth/login"
        headerLabel="Confirming your verification"
        backButtonLabel="Back to login"
    >
        <div className="flex items-center w-full justify-center">
            <BeatLoader />
            <FormSuccess message={success} />
            <FormError message={error} />
        </div>
    </CardWrapper>
}