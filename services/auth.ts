import { getServerApi } from "@/lib/server-api";

export const authService = {
    getMe: async () => {
        try {
            const api = await getServerApi();
            const response = await api.get('/api/auth/me');
            return response.data;
        } catch (error) {
            return { error: 'Erro ao buscar dados do usuário', data: null };
        }
    }
};
