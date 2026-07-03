import {api} from "@/plugins/gateway";
import type {ChapterPageDTO} from "@/types/chapter/ChapterPageDTO";
import {mapChapterPage} from "@/mappers/ChapterPageMapper";
import type {ChapterPage} from "@/types/chapter/ChapterPage";
import {mapChapter} from "@/mappers/ChapterMapper";
import {ChapterDTO} from "@/types/chapter/ChapterDTO";
import {Chapter} from "@/models/Chapter";

export class CatalogService {

    static async getChapters(params: Record<string, unknown>): Promise<ChapterPage> {

        const response = await api.get<ChapterPageDTO>(
            "/api/catalogue/public/chapters",
            {params}
        );

        return mapChapterPage(response.data);
    }

    static async getChapter(chapterUuid: string): Promise<Chapter> {
        const response = await api.get<ChapterDTO>(
            `/api/catalogue/public/chapters/${chapterUuid}`
        );

        return mapChapter(response.data);
    }
}