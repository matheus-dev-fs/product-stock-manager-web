import { User } from './user';

/**
 * Response structure from backend auth endpoints
 * Returned by: /api/auth/login, /api/auth/refresh
 */
export type AuthResponse = {
    user: User;
    accessToken: string; // JWT token
    refreshToken: string; // UUID string for refresh
};

/**
 * Response from logout endpoint
 */
export type LogoutResponse = {
    message: string;
};
