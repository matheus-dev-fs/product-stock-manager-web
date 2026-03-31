"use client"

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Label,
} from "@/components/ui/label";
import { User } from "@/types/user";
import { upsertUserAction } from "@/actions/user";
import { FieldError } from "@/components/field-error";

type Props = {
    user?: User;
}

const initialState = {
  error: '',
  fieldErrors: {} as Record<string, string[]>
}

export const UserForm = ({ user }: Props) => {
    const [state, action, isPending] = useActionState(upsertUserAction, initialState);

    return (
        <div className="p-4 max-w-2xl">
            <form action={action} className="space-y-6">
                {user && <input type="hidden" name="id" value={user.id} />}
                
                <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input 
                        id="name"
                        name="name" 
                        defaultValue={user?.name || ''} 
                        placeholder="Nome do usuário" 
                    />
                    <FieldError errors={state?.fieldErrors?.name} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                        id="email"
                        name="email" 
                        defaultValue={user?.email || ''} 
                        placeholder="email@exemplo.com" 
                    />
                    <FieldError errors={state?.fieldErrors?.email} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Senha {user && "(deixe em branco para manter)"}</Label>
                    <Input 
                        id="password"
                        name="password" 
                        type="password" 
                        placeholder="******" 
                    />
                    <FieldError errors={state?.fieldErrors?.password} />
                </div>

                {user && (
                    <div className="space-y-2">
                        <Label htmlFor="avatar">Avatar</Label>
                        <Input 
                            id="avatar"
                            name="avatar" 
                            type="file" 
                            accept="image/*"
                        />
                    </div>
                )}

                {state?.error && (
                    <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
                        {state.error}
                    </div>
                )}

                <Button type="submit" disabled={isPending}>
                    {isPending ? "Salvando..." : (user ? "Salvar Alterações" : "Criar Usuário")}
                </Button>
            </form>
        </div>
    );
}
