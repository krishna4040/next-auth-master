"use client"

import { useCurrentUser } from '@/hooks/use-current-user'
import { signOut } from 'next-auth/react'
import React from 'react'

const SettingsPage = () => {
    const user = useCurrentUser()
    const onClick = () => signOut()
    return (
        <div>SettingsPage</div>
    )
}

export default SettingsPage