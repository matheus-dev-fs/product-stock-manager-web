export type InventoryValue = {
    inventoryValue: number;
};

export type MoveSummaryItem = {
    value: number;
    count: number;
};

export type MovesSummary = {
    in: MoveSummaryItem;
    out: MoveSummaryItem;
};

export type MoveGraphItem = {
    date: string;
    totalValue: number;
};

