import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
// lib
import spotifyApi, { LOGIN_URL } from '@lib/spotify';
// models
import { AuthToken } from '@models/auth/auth_token';
import { AuthSession } from '@models/auth/auth_session';
import { REFRESH_ACCESS_TOKEN_ERROR_CODE } from '@lib/constants';

const refreshAccessToken = async (token: AuthToken): Promise<AuthToken> => {
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

        return {
            ...token,
            accessToken: refreshedToken.access_token ?? token.accessToken,
            accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // = 1 hour as 3600 returns from Spotify API
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
        };
    } catch (err) {
        console.error('Next Auth Error: ', err);

        return {
            ...token,
            error: REFRESH_ACCESS_TOKEN_ERROR_CODE,
        };
    }
};

export default NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? '',
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET ?? '',
            authorization: LOGIN_URL,
        }),
    ],
    secret: process.env.JWT_SECRET ?? '',
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user, account }) {
            const authToken = token as AuthToken;

            // initial sign in
            if (account && user) {
                return {
                    ...authToken,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at || 0 * 1000,
                };
            }

            // return previous token if the access token has not expired yet
            if (Date.now() < authToken.accessTokenExpires) {
                return authToken;
            }

            // Access token has expired, need to refresh it
            return await refreshAccessToken(authToken);
        },

        async session({ session, token }) {
            const authSession = session as AuthSession;
            const authToken = token as AuthToken;

            authSession.user.accessToken = authToken.accessToken;
            authSession.user.refreshToken = authToken.refreshToken;
            authSession.user.name = authToken.name;

            return authSession;
        },
    },
});
