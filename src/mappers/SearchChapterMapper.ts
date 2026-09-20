import type {SearchChapterDTO} from "@/types/search/SearchChapterDTO";
import {Chapter} from "@/models/Chapter";

export function mapSearchChapter(dto: SearchChapterDTO): Chapter {
    return new Chapter(
        dto.chapter_uuid,
        dto.title,
        dto.second_title,
        dto.total_pages,
        dto.chapter_number,
        dto.cover_artwork_url,
        dto.summary,
        dto.publication_date,
        null
    );
}