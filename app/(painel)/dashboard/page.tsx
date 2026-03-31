import { Suspense } from "react"
import { DashboardFilter } from "@/components/dashboard/dashboard-filter"
import { InventoryValueCard } from "@/components/dashboard/inventory-value-card"
import { MovesCards } from "@/components/dashboard/moves-cards"
import { MovesGraphContainer } from "@/components/dashboard/moves-graph-container"
import { LowStockList } from "@/components/dashboard/low-stock-list"
import { StagnantList } from "@/components/dashboard/stagnant-list"
import { SummaryCardSkeleton } from "@/components/dashboard/summary-card"
import { MovesGraphSkeleton } from "@/components/dashboard/moves-graph"
import { ProductListSkeleton } from "@/components/dashboard/product-list"
import { PageTitle } from "@/components/page-title"
import { formatDateToYYYYMMDD } from "@/lib/utils"

export default async function DashboardPage(props: {
    searchParams: Promise<{ period?: string }>
}) {
    const searchParams = await props.searchParams
    const rawPeriod = searchParams.period ? parseInt(searchParams.period) : 7
    const period = isNaN(rawPeriod) ? 7 : rawPeriod

    const today = new Date();
    const endDate = formatDateToYYYYMMDD(today);

    const start = new Date(today);
    start.setDate(today.getDate() - period + 1);
    const startDate = formatDateToYYYYMMDD(start);

    return (
        <div className="space-y-8">
            <PageTitle title="Dashboard" rightSide={<DashboardFilter />} />

            <div className="grid gap-4 md:grid-cols-3">
                <Suspense fallback={<SummaryCardSkeleton />}>
                    <InventoryValueCard />
                </Suspense>

                <Suspense fallback={<>
                    <SummaryCardSkeleton />
                    <SummaryCardSkeleton />
                </>}>
                    <MovesCards startDate={startDate} endDate={endDate} />
                </Suspense>
            </div>

            <Suspense fallback={<MovesGraphSkeleton />}>
                <MovesGraphContainer startDate={startDate} endDate={endDate} />
            </Suspense>

            <div className="grid gap-4 md:grid-cols-2">
                <Suspense fallback={<ProductListSkeleton />}>
                    <LowStockList />
                </Suspense>

                <Suspense fallback={<ProductListSkeleton />}>
                    <StagnantList startDate={startDate} endDate={endDate} />
                </Suspense>
            </div>
        </div>
    )
}
