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

    const token = data?.token

    if (!token) {
      return { error: 'Token not received from server' }
    }

    // Save token in HttpOnly cookie
    const cookieStore = await cookies()
    cookieStore.set('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
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
  cookieStore.delete('session_token')
  redirect('/login')
}
