import React from 'react';
import { useRecoilValue } from 'recoil';
import { currentTrackIdState } from 'atoms/songAtom';
import useSpotify from './useSpotify';
import { TrackDetails } from '@models/spotify/track_details';

function useSongInfo() {
    const { spotifyApi } = useSpotify();

    const currentTrackId = useRecoilValue(currentTrackIdState);

    const [trackInfo, setTrackInfo] = React.useState<TrackDetails | null>(null);

    React.useEffect(() => {
        const fetchTrackInfo = async () => {
            if (currentTrackId) {
                const spotifyTrackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentTrackId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                        },
                    }
                ).then((response) => response.json());

                setTrackInfo(spotifyTrackInfo as TrackDetails);
            }
        };

        fetchTrackInfo();
    }, [currentTrackId, spotifyApi]);

    return trackInfo;
}

export default useSongInfo;
