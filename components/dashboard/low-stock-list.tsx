import { dashboardService } from "@/services/dashboard";
import { ProductList } from "./product-list";

export async function LowStockList() {
    const { data } = await dashboardService.getLowStock();
    
    return (
        <ProductList
            title="Estoque Baixo"
            description="Produtos com quantidade próxima ou abaixo do mínimo"
            products={data || []}
            emptyMessage="Nenhum produto com estoque baixo"
        />
    )
}
