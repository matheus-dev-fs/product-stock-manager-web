import { dashboardService } from "@/services/dashboard";
import { ProductList } from "./product-list";

interface StagnantListProps {
    startDate?: string;
    endDate?: string;
}

export async function StagnantList({ startDate, endDate }: StagnantListProps) {
    const { data } = await dashboardService.getStagnantProducts(startDate, endDate);
    
    return (
        <ProductList
            title="Produtos Estagnados"
            description="Sem saídas no período selecionado"
            products={data || []}
            emptyMessage="Nenhum produto estagnado no período"
        />
    )
}
