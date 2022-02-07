import { Session } from 'next-auth';

export type AuthSession = Session & {
    user: {
        accessToken?: string;
        refreshToken?: string;
    };
};
