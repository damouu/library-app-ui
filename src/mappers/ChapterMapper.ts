import type {ChapterDTO} from "@/types/chapter/ChapterDTO";
import {Chapter} from "@/models/Chapter";
import {mapSeries} from "@/mappers/SeriesMapper";


export function mapChapter(dto: ChapterDTO): Chapter {
    return new Chapter(
        dto.uuid,
        dto.title,
        dto.secondTitle,
        dto.totalPages,
        dto.chapterNumber,
        dto.coverArtworkUrl,
        dto.summary,
        dto.publicationDate,
        mapSeries(dto.series!)
    );
}
