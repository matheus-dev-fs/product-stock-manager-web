export type Category = {
    id: string;
    name: string;
    productCount?: number; // only when includeProductCount=true in query
    createdAt: string; // ISO 8601 timestamp
};
