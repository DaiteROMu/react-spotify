import { Album } from './album';
import { Artist } from './artist';

export type TrackDetails = {
    id: string;
    name: string;
    duration_ms: number;
    url: string;
    album: Album;
    artists: Artist[];
};
