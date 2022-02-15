import React from 'react';
import Image from 'next/image';
import { currentTrackIdState, isPlayingState } from 'atoms/songAtom';
import { useRecoilState } from 'recoil';
import useSpotify from 'hooks/useSpotify';
import unknownSongImg from 'public/unknown-song.svg';
import useTrackInfo from 'hooks/useTrackInfo';
import { VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline';
import {
    FastForwardIcon,
    PauseIcon,
    PlayIcon,
    ReplyIcon,
    RewindIcon,
    VolumeUpIcon,
    SwitchHorizontalIcon,
} from '@heroicons/react/solid';
import { debounce } from 'lodash';

const Player: React.FC = () => {
    const { spotifyApi, authSession } = useSpotify();

    const [currentTrackId, setCurrentTrackId] =
        useRecoilState(currentTrackIdState);

    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

    const [volume, setVolume] = React.useState<number>(50);

    const trackInfo = useTrackInfo();

    const fetchCurrentTrack = React.useCallback(() => {
        if (!trackInfo) {
            spotifyApi
                .getMyCurrentPlayingTrack()
                .then((data) => {
                    setCurrentTrackId(data.body?.item?.id ?? null);

                    spotifyApi
                        .getMyCurrentPlaybackState()
                        .then((data) => {
                            setIsPlaying(data.body?.is_playing);
                        })
                        .catch((err) =>
                            console.log(
                                'Something is went wrong with PlaybackState: ',
                                err
                            )
                        );
                })
                .catch((err) =>
                    console.log(
                        'Something is went wrong with MyCurrentPlayingTrack: ',
                        err
                    )
                );
        }
    }, [trackInfo, spotifyApi, setCurrentTrackId, setIsPlaying]);

    React.useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentTrack();
            setVolume(50);
        }
    }, [currentTrackId, spotifyApi, authSession, fetchCurrentTrack]);

    const debouncedAdjustVolume = React.useCallback(
        (volume: number) => {
            debounce((volume) => {
                spotifyApi
                    .setVolume(volume)
                    .catch((err) =>
                        console.log(
                            'Something is went wrong with volume: ',
                            err
                        )
                    );
            }, 500);
        },
        [spotifyApi]
    );

    React.useEffect(() => {
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume);
        }
    }, [volume, debouncedAdjustVolume]);

    const handlePlayPauseClick: React.MouseEventHandler<SVGSVGElement> = () => {
        spotifyApi
            .getMyCurrentPlaybackState()
            .then((data) => {
                if (data.body) {
                    if (data.body?.is_playing) {
                        spotifyApi.pause();
                        setIsPlaying(false);
                    } else {
                        spotifyApi.play();
                        setIsPlaying(true);
                    }
                } else {
                    setIsPlaying(!isPlaying);
                }
            })
            .catch((err) => {
                setIsPlaying(!isPlaying);
                console.log(
                    'Something is went wrong with MyCurrentPlaybackState: ',
                    err
                );
            });
    };

    const handleSkipToPreviousClick: React.MouseEventHandler<
        SVGSVGElement
    > = () => {
        if (spotifyApi.getAccessToken() && trackInfo) {
            spotifyApi.skipToPrevious().catch((err) => {
                console.log(
                    'Something is went wrong with skipToPrevious: ',
                    err
                );
            });
        }
    };

    const handleSkipToNextClick: React.MouseEventHandler<
        SVGSVGElement
    > = () => {
        if (spotifyApi.getAccessToken() && trackInfo) {
            spotifyApi.skipToNext().catch((err) => {
                console.log('Something is went wrong with skipToNext: ', err);
            });
        }
    };

    const handleMusicVolumeSliderChange: React.ChangeEventHandler<
        HTMLInputElement
    > = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(e.target.value));
    };

    const handleVolumeDownIconClick: React.MouseEventHandler<
        SVGSVGElement
    > = () => {
        if (volume > 0) {
            setVolume(volume > 10 ? volume - 10 : 0);
        }
    };

    const handleVolumeUpIconClick: React.MouseEventHandler<
        SVGSVGElement
    > = () => {
        if (volume < 100) {
            setVolume(volume > 90 ? 100 : volume + 10);
        }
    };

    return (
        <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
            <div className="flex items-center space-x-4">
                <div className="relative w-10 h-10">
                    {trackInfo && (
                        <Image
                            className="hidden md:inline w-10 h-10"
                            src={
                                trackInfo?.album?.images?.[0]?.url ??
                                unknownSongImg
                            }
                            alt="Image Logo"
                            layout="fill"
                            objectFit="cover"
                        />
                    )}
                </div>

                <div>
                    <h3>{trackInfo?.name}</h3>
                    <p className="w-52 truncate">
                        {trackInfo?.artists
                            .map((artist) => artist.name)
                            .join(' & ')}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center space-x-3 md:space-x-4">
                <SwitchHorizontalIcon className="button" />
                <RewindIcon
                    onClick={handleSkipToPreviousClick}
                    className="button"
                />

                {isPlaying ? (
                    <PauseIcon
                        onClick={handlePlayPauseClick}
                        className="button w-10 h-10"
                    />
                ) : (
                    <PlayIcon
                        onClick={handlePlayPauseClick}
                        className="button w-10 h-10"
                    />
                )}

                <FastForwardIcon
                    onClick={handleSkipToNextClick}
                    className="button"
                />
                <ReplyIcon className="button" />
            </div>

            <div className="flex items-center justify-end space-x-3 md:space-x-4">
                <VolumeDownIcon
                    className="button"
                    onClick={handleVolumeDownIconClick}
                />
                <input
                    className="w-14 md:w-28"
                    type="range"
                    value={volume}
                    min={0}
                    max={100}
                    onChange={handleMusicVolumeSliderChange}
                />
                <VolumeUpIcon
                    className="button"
                    onClick={handleVolumeUpIconClick}
                />
            </div>
        </div>
    );
};

export default Player;
