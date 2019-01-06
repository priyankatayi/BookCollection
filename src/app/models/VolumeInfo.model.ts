import { ImageLinks } from './imageLinks.model';
import { Authors } from './authors.model';
export class VolumeInfo {
    title: string;
    description: string;
    authors: Authors;
    averageRating: number;
    imageLinks: ImageLinks;
}
