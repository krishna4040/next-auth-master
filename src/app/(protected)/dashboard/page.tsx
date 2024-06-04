import React from 'react'
import { auth, signOut } from '@/auth'

const SettingsPage = async () => {
    const session = await auth();

    return (
        <form action={async () => {
            "use sever"
            await signOut()
        }}>
            <button>Sign Out</button>
        </form>
    )
}

export default SettingsPage