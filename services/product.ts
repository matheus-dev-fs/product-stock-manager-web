import { getServerApi } from "@/lib/server-api";

export const productService = {
    getProducts: async (offset: number = 0, limit: number = 10, name?: string) => {
        try {
            const api = await getServerApi();
            const response = await api.get('/api/products', {
                params: { offset, limit, name }
            });
            return response.data;
        } catch (error) {
            return { error: 'Erro ao buscar produtos', data: null };
        }
    },

    getProductById: async (id: string) => {
        try {
            const api = await getServerApi();
            const response = await api.get(`/api/products/${id}`);
            return response.data;
        } catch (error) {
            return { error: 'Erro ao buscar produto', data: null };
        }
    }
};
