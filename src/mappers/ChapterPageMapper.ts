import type {ChapterPageDTO} from "@/types/chapter/ChapterPageDTO";
import type {ChapterPage} from "@/types/chapter/ChapterPage";
import {mapChapter} from "./ChapterMapper";

export function mapChapterPage(dto: ChapterPageDTO): ChapterPage {
    return {
        ...dto,
        content: dto.content.map(mapChapter)
    };
}