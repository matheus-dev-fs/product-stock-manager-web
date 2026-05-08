import { getServerApi } from "@/lib/server-api";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";

export const authService = {
    getMe: async (): Promise<ApiResponse<User>> => {
        try {
            const api = await getServerApi();
            const response = await api.get<ApiResponse<User>>('/api/auth/me');
            return response.data;
        } catch (error) {
            return { error: 'Erro ao buscar dados do usuário', data: null };
        }
    }
};
