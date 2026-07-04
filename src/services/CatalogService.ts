import {api} from "@/plugins/gateway";
import {Chapter} from "@/models/Chapter";
import {mapChapterPage} from "@/mappers/ChapterPageMapper";
import {mapChapter} from "@/mappers/ChapterMapper";
import type {ChapterPage} from "@/types/chapter/ChapterPage";
import type {ChapterPageDTO} from "@/types/chapter/ChapterPageDTO";
import type {ChapterDTO} from "@/types/chapter/ChapterDTO";
import type {SeriesPageDTO} from "@/types/SeriesPageDTO";
import {mapSeriesPage} from "@/mappers/SeriesPageMapper";
import {Series} from "@/types/Series";
import type {Page} from "@/types/Pagination";

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

    static async getSeries(params: { [k: string]: string | number; }): Promise<Page<Series>> {
        const response = await api.get<SeriesPageDTO>(
            `/api/catalogue/public/series/`,
            {params: params}
        );
        return mapSeriesPage(response.data);
    }
}