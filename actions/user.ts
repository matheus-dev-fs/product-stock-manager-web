'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { getServerApi } from '@/lib/server-api'
import { getFieldErrors } from '@/lib/utils'
import { userSchema } from '@/schemas/user'

export async function upsertUserAction(prevState: any, formData: FormData) {
    const id = formData.get('id') as string | null
    const password = formData.get('password') as string

    // Custom validation for password
    if (!id && (!password || password.length < 6)) {
        return {
            error: "Senha é obrigatória e deve ter pelo menos 6 caracteres",
            fieldErrors: { password: ["Senha inválida"] }
        }
    }
    if (id && password && password.length < 6) {
        return {
            error: "Senha deve ter pelo menos 6 caracteres",
            fieldErrors: { password: ["Senha muito curta"] }
        }
    }

    const rawData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    }

    // Validate fields
    const validation = userSchema.safeParse(rawData)

    if (!validation.success) {
        return {
            error: "Erro de validação",
            fieldErrors: getFieldErrors(validation.error)
        }
    }

    const api = await getServerApi()

    try {
        let response;
        if (!id) {
            // Create user (JSON)
            response = await api.post('/api/users', {
                name: rawData.name,
                email: rawData.email,
                password: rawData.password
            })
        } else {
            // UPDATE:
            const payload = new FormData()
            payload.append('name', rawData.name as string)
            payload.append('email', rawData.email as string)
            if (password) payload.append('password', password)

            const avatar = formData.get('avatar') as File
            if (avatar && avatar.size > 0) {
                payload.append('avatar', avatar)
            }

            response = await api.put(`/api/users/${id}`, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        }

        if (response.data.error) {
            return { error: response.data.error }
        }

    } catch (error: any) {
        return { error: error.response?.data?.error || 'Erro ao salvar usuário' }
    }

    revalidatePath('/users')
    redirect('/users')
}

export async function deleteUserAction(id: string) {
    const api = await getServerApi()
    try {
        const response = await api.delete(`/api/users/${id}`)

        if (response.status !== 204 && response.data?.error) {
            return { error: response.data.error }
        }

        revalidatePath('/users')
        return { error: null }
    } catch (error: any) {
        return { error: error.response?.data?.error || 'Erro ao deletar usuário' }
    }
}
