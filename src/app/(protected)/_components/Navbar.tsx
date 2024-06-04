"use client"

import { UserButton } from "@/components/auth/UserButton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Navbar = () => {
    const pathname = usePathname()

    return (
        <nav className="bg-secondary flex justify-center items-center p-4 rounded-xl w-[600px] shadow-sm">
            <ul className="flex gap-x-2">
                <li>
                    <Button asChild variant={pathname === "/settings" ? "default" : "outline"}>
                        <Link href={"/settings"}>
                            settings
                        </Link>
                    </Button>
                </li>
                <li>
                    <Button asChild variant={pathname === "/server" ? "default" : "outline"}>
                        <Link href={"/server"}>
                            server
                        </Link>
                    </Button>
                </li>
                <li>
                    <Button asChild variant={pathname === "/client" ? "default" : "outline"}>
                        <Link href={"/client"}>
                            client
                        </Link>
                    </Button>
                </li>
                <li>
                    <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
                        <Link href={"/admin"}>
                            admin
                        </Link>
                    </Button>
                </li>
            </ul>
            <UserButton />
        </nav>
    )
}