import React from 'react'
import { signOut } from '@/auth'
import { currentUser } from '@/lib/current-user'
import { UserInfo } from '@/components/auth/UserInfo'

const DashboardPage = async () => {
    const user = await currentUser()

    return (
        <main>
            <UserInfo
                user={user}
                label='Server Component 💻'
            />
        </main>
    )
}

export default DashboardPage