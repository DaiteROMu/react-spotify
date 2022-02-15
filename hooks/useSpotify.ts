import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import SpotifyWebApi from 'spotify-web-api-node';
import { REFRESH_ACCESS_TOKEN_ERROR_CODE } from '@lib/constants';
import { AuthSession } from '@models/auth/auth_session';

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

function useSpotify() {
    const { data: session } = useSession();

    const authSession = session as AuthSession;

    useEffect(() => {
        if (authSession) {
            // if refresh access token attempt fails, direct user to login
            if (authSession.error === REFRESH_ACCESS_TOKEN_ERROR_CODE) {
                signIn();
            }

            spotifyApi.setAccessToken(authSession.user.accessToken || '');
        }
    }, [authSession]);

    return { spotifyApi, authSession };
}

export default useSpotify;
