import type {SeriesDTO} from "@/types/chapter/SeriesDTO";

export interface ChapterDTO {
    uuid: string;
    title: string;
    secondTitle: string;
    chapterNumber: number;
    totalPages: number;
    genre: string;
    summary: string;
    publicationDate: string;
    coverArtworkUrl: string;
    series: SeriesDTO | null;
}