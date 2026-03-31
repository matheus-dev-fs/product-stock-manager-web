'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { getServerApi } from '@/lib/server-api'
import { toCents, getFieldErrors } from '@/lib/utils'

import { productSchema } from '@/schemas/product'

export async function upsertProductAction(prevState: any, formData: FormData) {
  const id = formData.get('id') as string | null

  const rawData = {
    name: formData.get('name'),
    categoryId: formData.get('categoryId'),
    unitPrice: formData.get('unitPrice'),
    unitType: formData.get('unitType'),
    quantity: formData.get('quantity'),
    minimumQuantity: formData.get('minimumQuantity'),
    maximumQuantity: formData.get('maximumQuantity'),
  }

  // Validate data
  const validation = productSchema.safeParse(rawData)

  if (!validation.success) {
    return {
      error: "Erro de validação",
      fieldErrors: getFieldErrors(validation.error)
    }
  }

  const { unitPrice, ...otherData } = validation.data
  const payload = {
    ...otherData,
    unitPrice: toCents(unitPrice) // Convert to cents
  }

  const api = await getServerApi()

  try {
    let response;
    if (id) {
      // Update
      response = await api.put(`/api/products/${id}`, payload)
    } else {
      // Create
      response = await api.post('/api/products', payload)
    }

    if (response.data.error) {
      return { error: response.data.error }
    }

  } catch (error: any) {
    return { error: error.response?.data?.error || 'Erro ao salvar produto' }
  }

  revalidatePath('/products')
  redirect('/products')
}

export async function deleteProductAction(id: string) {
  const api = await getServerApi()
  try {
    const response = await api.delete(`/api/products/${id}`)

    if (response.status !== 204 && response.data?.error) {
      return { error: response.data.error }
    }

    revalidatePath('/products')
    return { error: null }
  } catch (error: any) {
    return { error: error.response?.data?.error || 'Erro ao deletar produto' }
  }
}

export async function searchProductsAction(term: string) {
  const api = await getServerApi()
  try {
    const response = await api.get('/api/products', {
      params: { name: term, limit: 20 }
    });
    return { data: response.data?.data || [] };
  } catch (error: any) {
    return { error: 'Erro ao buscar produtos', data: [] };
  }
}
