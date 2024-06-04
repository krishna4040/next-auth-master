import { ExtendedUser } from "@/next-auth";
import CardWrapper from "./CardWrapper";
import { Card, CardContent, CardHeader } from "../ui/card";

interface UserInfoProps {
    user?: ExtendedUser
    label: string
}

interface ContentProps {
    label: string
    value: string
}

const Content = ({ label, value }: ContentProps) => {
    return (
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <p className="text-sm font-medium">{label}</p>
            <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">{value}</p>
        </div>
    )
}

export const UserInfo = ({ label, user }: UserInfoProps) => {
    return (
        <Card className="w-[600px] shadow-md">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    {label}
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <Content label="ID" value={user?.id || ""} />
                <Content label="Name" value={user?.name || ""} />
                <Content label="Email" value={user?.email || ""} />
                <Content label="Role" value={user?.role || ""} />
                <Content label="2FA" value={user?.isTwoFactorEnabled ?  "On" : "Off"} />
            </CardContent>
        </Card>
    )
}