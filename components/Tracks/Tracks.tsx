import React from 'react';
import { useRecoilValue } from 'recoil';
import { playlistState } from 'atoms/playlistAtom';
import { PlaylistTracks } from '@models/spotify/playlist_tracks';
import Track from '@components/Track';

const Tracks: React.FC = () => {
    const playlistTracks = useRecoilValue(playlistState)
        ?.tracks as PlaylistTracks;

    return (
        <div className="px-8 pb-28 flex flex-col space-y-1 text-white">
            {playlistTracks?.items?.map((playlistTrack, index) => (
                <Track
                    key={playlistTrack.track.id}
                    order={index}
                    track={playlistTrack}
                />
            ))}
        </div>
    );
};

export default Tracks;
