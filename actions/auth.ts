'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getServerApi } from '@/lib/server-api'

export async function loginAction(prevState: any, formData: FormData) {
    const email = formData.get('email')
    const password = formData.get('password')

    const api = await getServerApi()

    try {
        const response = await api.post('/api/auth/login', {
            email,
            password,
        })

        const { data, error } = response.data

        if (error) {
            return { error }
        }

        const accessToken = data?.accessToken
        const refreshToken = data?.refreshToken

        if (!accessToken || !refreshToken) {
            return { error: 'Tokens not received from server' }
        }

        // Save tokens in HttpOnly cookies
        const cookieStore = await cookies()
        cookieStore.set('access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 15, // 15 minutes
            path: '/',
        })
        cookieStore.set('refresh_token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        })
    } catch (err: any) {
        // Handle axios errors
        const errorMessage = err.response?.data?.error || err.message || 'Login failed'
        return { error: errorMessage }
    }

    // Redirect after successful login
    redirect('/dashboard')
}

export async function logoutAction() {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refresh_token')?.value

    try {
        const api = await getServerApi()
        await api.post('/api/auth/logout', { refreshToken })
    } catch (e) {
        // ignore errors during logout request
    }

    cookieStore.delete('access_token')
    cookieStore.delete('refresh_token')
    redirect('/login')
}
