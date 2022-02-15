import React from 'react';
import { useSetRecoilState } from 'recoil';
import { playlistIdState } from 'atoms/playlistAtom';
import useSpotify from 'hooks/useSpotify';
import SidebarMenu from '@components/SidebarMenu';
import SidebarPlaylistItem from '@components/SidebarPlaylistItem';

const Sidebar: React.FC = () => {
    const { spotifyApi, authSession } = useSpotify();

    const [playlists, setPlaylists] = React.useState<
        SpotifyApi.PlaylistObjectSimplified[]
    >([]);

    const setPlaylistId = useSetRecoilState(playlistIdState);

    React.useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
        }
    }, [spotifyApi, authSession]);

    return (
        <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 h-screen overflow-y-scroll scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
            <div className="space-y-4">
                <SidebarMenu />

                <div className="space-y-3 pb-36">
                    {playlists &&
                        playlists.map((playlist) => (
                            <SidebarPlaylistItem
                                key={playlist.id}
                                id={playlist.id}
                                name={playlist.name}
                                sidebarPlaylistItemClick={setPlaylistId}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
