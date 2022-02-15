import React from 'react';
import Image from 'next/image';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistState, playlistIdState } from 'atoms/playlistAtom';
import useSpotify from 'hooks/useSpotify';
import ProfileButton from '@components/ProfileButton';
import Tracks from '@components/Tracks';

const colors = [
    'from-indigo-500',
    'from-blue-500',
    'from-green-500',
    'from-red-500',
    'from-yellow-500',
    'from-pink-500',
    'from-purple-500',
];

const Center: React.FC = () => {
    const { spotifyApi, authSession } = useSpotify();

    const [color, setColor] = React.useState<string | undefined>(undefined);

    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);

    React.useEffect(() => {
        if (playlistId) {
            spotifyApi
                .getPlaylist(playlistId)
                .then((data) => {
                    setPlaylist(data.body);
                })
                .catch((error) =>
                    console.log(
                        'Something is went wrong with playlist: ',
                        error
                    )
                );
        }
    }, [spotifyApi, playlistId, setPlaylist]);

    React.useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [playlistId]);

    return (
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
            <ProfileButton
                name={authSession?.user?.name}
                imageUrl={authSession?.user?.image}
            />

            <section
                className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
            >
                {playlist?.images[0]?.url && (
                    <div className="relative w-44 h-44 shadow-2xl">
                        <Image
                            src={playlist?.images[0]?.url}
                            alt="Playlist Image"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                )}

                <div>
                    <p>PLAYLIST</p>
                    <h2 className="text-2xl md:tex-3xl xl:text-5xl font-bold">
                        {playlist?.name}
                    </h2>
                </div>
            </section>

            <section>
                <Tracks />
            </section>
        </div>
    );
};

export default Center;
