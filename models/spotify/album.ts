import { AlbumImage } from './album_image';

export type Album = {
    id: string;
    name: string;
    images: AlbumImage[];
};
