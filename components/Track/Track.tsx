import React from 'react';
import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from 'atoms/songAtom';
import { TrackProps } from './Track.props';
import useSpotify from 'hooks/useSpotify';
import unknownSongImg from 'public/unknown-song.svg';
import { millisecondsToMinutesAndSeconds } from '@lib/time';

const Track: React.FC<TrackProps> = ({ order, track }) => {
    const { spotifyApi } = useSpotify();

    const setCurrentTrackId = useSetRecoilState(currentTrackIdState);
    const setIsPlaying = useSetRecoilState(isPlayingState);

    const handleTrackClickToPlay: React.MouseEventHandler<
        HTMLDivElement
    > = () => {
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);
        spotifyApi
            .play({
                uris: [track.track.url],
            })
            .catch((err) =>
                console.log('Something is went wrong with play: ', err)
            );
    };

    return (
        <div
            className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
            onClick={handleTrackClickToPlay}
        >
            <div className="flex items-center space-x-4">
                <div>
                    <p>{order + 1}</p>
                </div>
                <div className="relative w-10 h-10">
                    <Image
                        className="bg-[color:var(--logo-color)]"
                        src={
                            track.track.album?.images[0]?.url ?? unknownSongImg
                        }
                        alt={`${track.track.name} song image`}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div>
                    <p className="w-36 lg:w-64 truncate text-white">
                        {track.track.name}
                    </p>
                    <p className="w-40 lg:w-72 truncate">
                        {track.track.artists
                            .map((artist) => artist.name)
                            .join(' & ')}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between ml-auto md:ml-0">
                <p className="w-40 hidden md:inline">
                    {track.track.album?.name}
                </p>
                <p>
                    {millisecondsToMinutesAndSeconds(track.track.duration_ms)}
                </p>
            </div>
        </div>
    );
};

export default Track;
