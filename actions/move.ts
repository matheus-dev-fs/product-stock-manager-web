'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { getFieldErrors } from '@/lib/utils'
import { moveSchema } from '@/schemas/move'
import { moveService } from '@/services/move'


export async function createMoveAction(prevState: any, formData: FormData) {
  const rawData = {
    productId: formData.get('productId'),
    type: formData.get('type'),
    quantity: formData.get('quantity'),
  }

  // Validate data
  const validation = moveSchema.safeParse(rawData)

  if (!validation.success) {
    return {
      error: "Erro de validação",
      fieldErrors: getFieldErrors(validation.error)
    }
  }

  const { productId, type, quantity } = validation.data

  const response = await moveService.createMove({
    productId,
    type,
    quantity,
  });

  if (response.error) {
    return { error: response.error }
  }

  revalidatePath('/moves')
  revalidatePath('/products')
  redirect('/moves')
}
