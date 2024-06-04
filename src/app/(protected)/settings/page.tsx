"use client"

import { UserInfo } from '@/components/auth/UserInfo'
import { useCurrentUser } from '@/hooks/use-current-user'
import { signOut } from 'next-auth/react'
import React from 'react'

const SettingsPage = () => {
    const user = useCurrentUser()
    const onClick = () => signOut()
    return (
        <main>
            <UserInfo
                user={user}
                label='Client Component 💻'
            />
        </main>
    )
}

export default SettingsPage