'use client'

import { useActionState } from 'react'
import { loginAction } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const [state, action, isPending] = useActionState(loginAction, null)

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/50">
      <div className="w-full max-w-sm p-6 bg-background rounded-lg border shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">B7Estoque Login</h1>
        
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="admin@example.com"
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              required 
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-500 text-center">{state.error}</p>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </div>
    </div>
  )
}
