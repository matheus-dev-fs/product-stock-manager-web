import { dashboardService } from "@/services/dashboard";
import { SummaryCard } from "./summary-card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface MovesCardsProps {
    startDate?: string;
    endDate?: string;
}

export async function MovesCards({ startDate, endDate }: MovesCardsProps) {
    const { data } = await dashboardService.getMovesSummary(startDate, endDate);

    const inValue = data?.in.value || 0;
    const inCount = data?.in.count || 0;

    const outValue = data?.out.value || 0;
    const outCount = data?.out.count || 0;

    return (
        <>
            <SummaryCard
                title="Entradas no Período"
                value={formatCurrency(inValue)}
                icon={ArrowDownIcon}
                description={`${inCount} movimentações`}
            />
            <SummaryCard
                title="Saídas no Período"
                value={formatCurrency(outValue)}
                icon={ArrowUpIcon}
                description={`${outCount} movimentações`}
            />
        </>
    )
}
