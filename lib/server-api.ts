import { cookies } from 'next/headers'
import axios from 'axios'

export async function getServerApi() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session_token')?.value

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
  })

  return api
}
