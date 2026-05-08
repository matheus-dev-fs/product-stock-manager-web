export type InventoryValue = {
    inventoryValue: number; // in cents
};

export type MoveSummaryItem = {
    value: number; // in cents
    count: number;
};

export type MovesSummary = {
    in: MoveSummaryItem;
    out: MoveSummaryItem;
};

export type MoveGraphItem = {
    date: string; // YYYY-MM-DD format
    totalValue: number; // in cents
};

