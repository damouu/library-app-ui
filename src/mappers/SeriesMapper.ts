import type {SeriesDTO} from "@/types/chapter/SeriesDTO";
import {Series} from "@/models/Series";

export function mapSeries(dto: SeriesDTO): Series {

    return new Series(
        dto.uuid,
        dto.title,
        dto.genre,
        dto.coverArtworkUrl,
        dto.illustration,
        dto.publisher,
        dto.lastPrintPublicationDate,
        dto.firstPrintPublicationDate,
        dto.author
    );
}