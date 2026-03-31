import { getServerApi } from "@/lib/server-api";
import { MovePayload } from "@/types/move";

export const moveService = {
    getMoves: async (offset: number = 0, limit: number = 10, productId?: string) => {
        try {
            const api = await getServerApi();
            const params: Record<string, string | number> = { offset, limit };
            if (productId) params.productId = productId;

            const response = await api.get('/api/moves', { params });
            return response.data;
        } catch (error: any) {
            return { error: error.response?.data?.error || 'Erro ao buscar movimentações', data: [] };
        }
    },

    createMove: async (data: MovePayload) => {
        try {
            const api = await getServerApi();
            const response = await api.post('/api/moves', data);
            return response.data;
        } catch (error: any) {
            return { error: error.response?.data?.error || 'Erro ao registrar movimentação', data: null };
        }
    }
};
