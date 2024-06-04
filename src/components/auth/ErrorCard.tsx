import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import CardWrapper from "./CardWrapper"

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Oops! something went wrong."
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
        >
            <div className="flex w-full justify-center items-center">
                <ExclamationTriangleIcon className="text-destructive" />
            </div>
        </CardWrapper>
    )
}