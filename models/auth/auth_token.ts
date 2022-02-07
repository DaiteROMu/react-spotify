import { JWT } from 'next-auth/jwt';

export type AuthToken = JWT & {
    accessToken: string;
    refreshToken: string;
    username: string;
    accessTokenExpires: number;
    error?: string;
};
