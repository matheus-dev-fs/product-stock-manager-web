export type Product = {
    id: string;
    name: string;
    categoryId: string;
    categoryName?: string | null;
    unitPrice: number; // in cents (integer)
    unitType: "kg" | "g" | "l" | "ml" | "un";
    quantity: string; // numeric string from backend (e.g. "100.50")
    minimumQuantity: string; // numeric string from backend
    maximumQuantity: string; // numeric string from backend
    createdAt: string; // ISO 8601 timestamp
};

/** Utility type for when quantities are converted to numbers for calculations */
export type ProductWithNumericQuantities = Omit<Product, 'quantity' | 'minimumQuantity' | 'maximumQuantity'> & {
    quantity: number;
    minimumQuantity: number;
    maximumQuantity: number;
};
