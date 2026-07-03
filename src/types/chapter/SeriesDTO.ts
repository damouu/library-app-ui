export interface SeriesDTO {
    uuid: string;
    title: string;
    genre: string;
    coverArtworkUrl: string;
    author: string;
    illustration: string;
    publisher: string;
    firstPrintPublicationDate: string;
    lastPrintPublicationDate: string | null;
}