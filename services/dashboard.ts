import { getServerApi } from "@/lib/server-api";
import { InventoryValue, MovesSummary, MoveGraphItem } from "@/types/dashboard";
import { Product } from "@/types/product";
import { ApiResponse, ApiListResponse } from "@/types/api";

export const dashboardService = {
    getInventoryValue: async (): Promise<ApiResponse<InventoryValue>> => {
        try {
            const api = await getServerApi();
            const response = await api.get('/api/dashboard/inventory-value');
            return response.data;
        } catch (error) {
            return { error: 'Erro ao buscar valor do estoque', data: null };
        }
    },

    getMovesSummary: async (startDate?: string, endDate?: string): Promise<ApiResponse<MovesSummary>> => {
        try {
            const api = await getServerApi();
            const response = await api.get('/api/dashboard/stock-movements-summary', {
                params: { startDate, endDate }
            });
            return response.data;
        } catch (error) {
            return { error: 'Erro ao buscar resumo de movimentações', data: null };
        }
    },

    getMovesGraph: async (startDate?: string, endDate?: string): Promise<ApiListResponse<MoveGraphItem>> => {
        try {
            const api = await getServerApi();
            const response = await api.get('/api/dashboard/stock-movements-graph', {
                params: { startDate, endDate }
            });
            return response.data;
        } catch (error) {
            return { error: 'Erro ao buscar gráfico de movimentações', data: [] };
        }
    },

    getLowStock: async (): Promise<ApiListResponse<Product>> => {
        try {
            const api = await getServerApi();
            const response = await api.get('/api/dashboard/low-stock-products');
            return response.data;
        } catch (error) {
            return { error: 'Erro ao buscar produtos com estoque baixo', data: [] };
        }
    },

    getStagnantProducts: async (startDate?: string, endDate?: string): Promise<ApiListResponse<Product>> => {
        try {
            const api = await getServerApi();
            const response = await api.get('/api/dashboard/stagnant-products', {
                params: { startDate, endDate }
            });
            return response.data;
        } catch (error) {
            return { error: 'Erro ao buscar produtos estagnados', data: [] };
        }
    }
};
