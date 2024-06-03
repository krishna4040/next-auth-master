import {ExclamationTriangleIcon} from '@radix-ui/react-icons'

interface FormErrorProps {
    message?: string
}

export const FormError = ({message}: FormErrorProps) => {
    if (!message) {
        return null
    }

    return (
        <div className='bg-destructive/15 p-3 rounded-md text-destructive text-sm flex items-center gap-x-2'>
            <ExclamationTriangleIcon className='h-5 w-5' />
            <p>{message}</p>
        </div>
    )
}