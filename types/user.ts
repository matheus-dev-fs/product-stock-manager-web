export type User = {
    id: string;
    name: string;
    email: string;
    avatar: string | null; // can be null or path/URL
    isAdmin: boolean;
};
