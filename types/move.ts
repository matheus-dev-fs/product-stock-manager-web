export type MoveType = 'in' | 'out';

export type Move = {
    id: string;
    productId: string;
    productName?: string | null;
    userId: string;
    type: MoveType;
    quantity: string; // numeric string from backend (e.g. "50.25")
    unitPrice: number; // in cents
    createdAt: string; // ISO 8601 timestamp
};

/** Utility type for when quantity is converted to number for calculations */
export type MoveWithNumericQuantity = Omit<Move, 'quantity'> & {
    quantity: number;
};

export type MovePayload = {
    productId: string;
    type: MoveType;
    quantity: number; // user input as number
};
