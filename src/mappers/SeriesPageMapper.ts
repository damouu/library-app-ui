import type {ChapterPageDTO} from "@/types/chapter/ChapterPageDTO";
import {Chapter} from "@/models/Chapter";
import type {Page} from "@/types/common/Pagination";
import {mapChapter} from "@/mappers/ChapterMapper";

export function mapChapterPage(dto: ChapterPageDTO): Page<Chapter> {
    return {
        content: dto.content.map(mapChapter),
        pageable: dto.pageable,
        sort: dto.sort,
        totalPages: dto.totalPages,
        totalElements: dto.totalElements,
        size: dto.size,
        number: dto.number,
        first: dto.first,
        last: dto.last,
        numberOfElements: dto.numberOfElements,
        empty: dto.empty
    };
}