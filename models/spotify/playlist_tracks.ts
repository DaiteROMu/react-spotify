import { Track } from './track';

export type PlaylistTracks = {
    href: string;
    total: number;
    items: Track[];
};
