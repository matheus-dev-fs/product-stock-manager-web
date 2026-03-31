export type MoveType = 'in' | 'out';

export type Move = {
    id: string;
    productId: string;
    productName?: string;
    userId: string;
    type: MoveType;
    quantity: number;
    unitPrice: number;
    date?: string;
    createdAt?: string;
};

export type MovePayload = {
    productId: string;
    type: MoveType;
    quantity: number;
};
