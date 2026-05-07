import { dashboardService } from "@/services/dashboard";
import { SummaryCard } from "./summary-card";
import { DollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export async function InventoryValueCard() {
    const { data } = await dashboardService.getInventoryValue();
    const value = data?.inventoryValue|| 0;

    return (
        <SummaryCard
            title="Valor em Estoque"
            value={formatCurrency(value)}
            icon={DollarSign}
            description="Valor total atual"
        />
    )
}
