"use client"

import { MoveGraphItem } from "@/types/dashboard"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface MovesGraphProps {
    data: MoveGraphItem[]
}

export function MovesGraph({ data }: MovesGraphProps) {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <div className="flex flex-col space-y-1.5 pb-4">
                <h3 className="font-semibold leading-none tracking-tight">Saídas Diárias</h3>
                <p className="text-sm text-muted-foreground">Volume de saídas no período selecionado</p>
            </div>
            <div className="w-full">
                <ResponsiveContainer width="100%" height={300} minWidth={0}>
                    <BarChart data={data}>
                        <XAxis
                            dataKey="date"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => {
                                const [year, month, day] = value.split('-');
                                return `${day}/${month}`;
                            }}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `R$ ${(value / 100).toFixed(0)}`}
                        />
                        <Tooltip
                            formatter={(value) => {
                                return [`R$ ${(Number(value) / 100).toFixed(2)}`, 'Total'];
                            }}
                            labelFormatter={(label) => {
                                if (typeof label !== 'string') return label;
                                const [year, month, day] = label.split('-');
                                return `${day}/${month}/${year}`;
                            }}
                            contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                        />
                        <Bar dataKey="totalValue" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export function MovesGraphSkeleton() {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <div className="flex flex-col space-y-1.5 pb-4">
                <div className="h-5 w-32 bg-muted animate-pulse rounded" />
                <div className="h-4 w-48 bg-muted animate-pulse rounded mt-1" />
            </div>
            <div className="h-[300px] w-full bg-muted/20 animate-pulse rounded" />
        </div>
    )
}
