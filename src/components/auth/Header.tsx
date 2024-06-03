import { Poppins } from 'next/font/google'
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})

interface HeaderProps {
    label: string
}

export default function Header({ label }: HeaderProps) {
    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <h1 className={cn("text-3xl font-semibold", font.className)}>
                Auth🔒
            </h1>
            <p className='text-muted-foreground text-sm'>
                {label}
            </p>
        </div>
    )
}