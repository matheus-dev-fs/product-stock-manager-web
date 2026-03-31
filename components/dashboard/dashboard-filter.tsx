"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"

export function DashboardFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPeriod = searchParams.get("period") || "7"

  const onValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("period", value)
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Período:</span>
      <Select value={currentPeriod} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecione o período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7">Últimos 7 dias</SelectItem>
          <SelectItem value="30">Últimos 30 dias</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
