import { getServerApi } from "@/lib/server-api";

export const userService = {
    getUsers: async (offset: number = 0, limit: number = 10) => {
        try {
            const api = await getServerApi();
            const response = await api.get('/api/users', {
                params: { offset, limit }
            });
            return response.data;
        } catch (error) {
            return { error: 'Erro ao buscar usuários', data: null };
        }
    },

    getUserById: async (id: string) => {
        try {
            const api = await getServerApi();
            const response = await api.get(`/api/users/${id}`);
            return response.data;
        } catch (error) {
            return { error: 'Erro ao buscar usuário', data: null };
        }
    }
};
