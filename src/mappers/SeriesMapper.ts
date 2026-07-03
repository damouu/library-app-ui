import type {SeriesDTO} from "@/types/chapter/SeriesDTO";
import {Series} from "@/models/Series";

export function mapSeries(dto: SeriesDTO | null): Series | null {
    if (!dto) {
        return null;
    }

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