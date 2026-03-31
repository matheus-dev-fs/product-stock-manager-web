import { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";

interface ProductListProps {
    title: string;
    description: string;
    products: Product[];
    emptyMessage?: string;
}

export function ProductList({ title, description, products, emptyMessage = "Nenhum produto encontrado" }: ProductListProps) {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 pb-4">
                <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
            <div className="p-6 pt-0">
                {products.length === 0 ? (
                    <div className="text-sm text-muted-foreground text-center py-4">{emptyMessage}</div>
                ) : (
                    <div className="space-y-4">
                        {products.map((product) => (
                            <div key={product.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                <div>
                                    <p className="font-medium text-sm">{product.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        Qtd: {product.quantity} {product.unitType}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-sm">{formatCurrency(product.unitPrice)}</p>
                                    {product.minimumQuantity > 0 && (
                                        <p className="text-xs text-muted-foreground">
                                            Min: {product.minimumQuantity}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export function ProductListSkeleton() {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 pb-4">
                <div className="h-5 w-32 bg-muted animate-pulse rounded" />
                <div className="h-4 w-48 bg-muted animate-pulse rounded mt-1" />
            </div>
            <div className="p-6 pt-0 space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div>
                            <div className="h-4 w-32 bg-muted animate-pulse rounded mb-1" />
                            <div className="h-3 w-16 bg-muted animate-pulse rounded" />
                        </div>
                        <div className="text-right">
                            <div className="h-4 w-16 bg-muted animate-pulse rounded mb-1" />
                            <div className="h-3 w-12 bg-muted animate-pulse rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
