import { atom } from 'recoil';

export const playlistState = atom<SpotifyApi.PlaylistObjectSimplified | null>({
    key: 'playlistState',
    default: null,
});

export const playlistIdState = atom<string | null>({
    key: 'playlistIdState',
    default: '7ETNr3Gf65GTwOc4N5e975',
});
