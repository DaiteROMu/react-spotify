import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import spotifyApi, { LOGIN_URL } from '../../../utils/spotify';
import { AuthToken } from '../../../models/auth/auth_token';
import { AuthSession } from '../../../models/auth/auth_session';

const refreshAccessToken = async (token: AuthToken) => {
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
        console.log('Refreshed token is', refreshedToken);

        return {
            ...token,
            accessToken: refreshedToken,
            accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // = 1 hour as 3600 returns from Spotify API
            refreshToken: refreshedToken ?? token.refreshToken,
        };
    } catch (err) {
        console.error(err);

        return {
            ...token,
            error: 'RefreshAccessTokenError',
        };
    }
};

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID ?? '';
const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET ?? '';
const secret = process.env.JWT_SECRET ?? '';

export default NextAuth({
    providers: [
        SpotifyProvider({
            clientId,
            clientSecret,
            authorization: LOGIN_URL,
        }),
    ],
    secret,
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
                console.log('existing token is valid');
                return authToken;
            }

            // Access token has expired, need to refresh it
            console.log('access token is expired');
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
