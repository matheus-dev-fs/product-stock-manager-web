"use client"

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createMoveAction } from "@/actions/move";
import { Product } from "@/types/product";
import { searchProductsAction } from "@/actions/product";
import { formatCurrency } from "@/lib/utils";
import { Loader2, X } from "lucide-react";
import { FieldError } from "@/components/field-error";

const initialState = {
    error: '',
    fieldErrors: {} as Record<string, string[]>
}

export const MoveForm = () => {
    const [state, action, isPending] = useActionState(createMoveAction, initialState);

    // Search state
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    // Selection state
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm.length >= 2 && !selectedProduct) {
                setIsSearching(true);
                const res = await searchProductsAction(searchTerm);
                if (res.data) {
                    setSearchResults(res.data);
                }
                setIsSearching(false);
            } else {
                setSearchResults([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, selectedProduct]);

    const handleSelectProduct = (product: Product) => {
        setSelectedProduct(product);
        setSearchTerm(product.name);
        setSearchResults([]);
    };

    const handleClearSelection = () => {
        setSelectedProduct(null);
        setSearchTerm("");
        setSearchResults([]);
    };

    return (
        <div className="p-4 max-w-2xl">
            <form action={action} className="space-y-6">
                <input type="hidden" name="productId" value={selectedProduct?.id || ''} />

                <div className="space-y-4">
                    {/* Product Search */}
                    <div className="space-y-2 relative">
                        <Label htmlFor="search">Produto</Label>
                        <div className="relative">
                            <Input
                                id="search"
                                placeholder="Digite o nome do produto..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    if (selectedProduct) {
                                        setSelectedProduct(null);
                                    }
                                }}
                                disabled={!!selectedProduct}
                                className={selectedProduct ? "bg-muted text-muted-foreground pr-10" : ""}
                            />
                            {selectedProduct && (
                                <button
                                    type="button"
                                    onClick={handleClearSelection}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                            {isSearching && (
                                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                </div>
                            )}
                        </div>

                        <FieldError errors={state?.fieldErrors?.productId} />

                        {/* Search Results List */}
                        {!selectedProduct && searchResults.length > 0 && (
                            <div className="absolute z-10 w-full bg-background border rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                                {searchResults.map((product) => (
                                    <div
                                        key={product.id}
                                        className="p-3 hover:bg-muted cursor-pointer border-b last:border-0"
                                        onClick={() => handleSelectProduct(product)}
                                    >
                                        <div className="font-medium">{product.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            Estoque: {product.quantity} {product.unitType} • {formatCurrency(product.unitPrice)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Selected Product Info */}
                    {selectedProduct && (
                        <div className="bg-secondary p-4 rounded-md border text-sm space-y-1">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Preço Unitário:</span>
                                <span className="font-medium">{formatCurrency(selectedProduct.unitPrice)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Estoque Atual:</span>
                                <span className="font-medium">{selectedProduct.quantity} {selectedProduct.unitType}</span>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="type">Tipo</Label>
                            <Select name="type" defaultValue="in">
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="in">Entrada (+)</SelectItem>
                                    <SelectItem value="out">Saída (-)</SelectItem>
                                </SelectContent>
                            </Select>
                            <FieldError errors={state?.fieldErrors?.type} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="quantity">Quantidade ({selectedProduct?.unitType || 'un'})</Label>
                            <Input
                                id="quantity"
                                name="quantity"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                required
                            />
                            <FieldError errors={state?.fieldErrors?.quantity} />
                        </div>
                    </div>
                </div>

                {state?.error && (
                    <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
                        {state.error}
                    </div>
                )}

                <Button type="submit" disabled={isPending || !selectedProduct} className="w-full">
                    {isPending ? "Salvando..." : "Confirmar Movimentação"}
                </Button>
            </form>
        </div>
    );
}
