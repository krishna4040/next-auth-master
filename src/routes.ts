export const publicRoutes = [
    "/",
    "/auth/new-verification"
]

// Array of routes used for authentication 
// These routes will redirect to DEFAULT_LOGIN_REDIRECT
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
]

// Prefix for API authentication routes
// routes starts with this prefix are used for API authentication purposes
export const apiAuthPrefix = "/api/auth"

export const DEFAULT_LOGIN_REDIRECT = "/dashboard"