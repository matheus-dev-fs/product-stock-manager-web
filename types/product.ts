export type Product = {
    id: string;
    name: string;
    categoryId: string;
    categoryName?: string;
    unitPrice: number; // in cents
    unitType: "kg" | "g" | "l" | "ml" | "un";
    quantity: number; // current stock
    minimumQuantity: number;
    maximumQuantity: number;
    createdAt?: string;
    updatedAt?: string;
};
