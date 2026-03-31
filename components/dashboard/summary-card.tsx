import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
    title: string;
    value: string;
    description?: string;
    icon: LucideIcon;
}

export function SummaryCard({ title, value, description, icon: Icon }: SummaryCardProps) {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">{title}</h3>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="pt-4">
                <div className="text-2xl font-bold">{value}</div>
                {description && (
                    <p className="text-xs text-muted-foreground">{description}</p>
                )}
            </div>
        </div>
    )
}

export function SummaryCardSkeleton() {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                <div className="h-4 w-4 bg-muted animate-pulse rounded" />
            </div>
            <div className="pt-4">
                <div className="h-8 w-16 bg-muted animate-pulse rounded" />
            </div>
        </div>
    )
}
