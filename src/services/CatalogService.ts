import {api} from "@/plugins/gateway";
import {Series} from "@/models/Series";
import {Chapter} from "@/models/Chapter";
import type {ChapterPage} from "@/types/chapter/ChapterPage";
import type {ChapterPageDTO} from "@/types/chapter/ChapterPageDTO";
import type {ChapterDTO} from "@/types/chapter/ChapterDTO";
import type {SeriesPageDTO} from "@/types/series/SeriesPageDTO";
import type {Page} from "@/types/common/Pagination";
import {mapChapterPage} from "@/mappers/SeriesPageMapper";
import {mapChapter} from "@/mappers/ChapterMapper";
import {mapSeriesPage} from "@/mappers/SeriesChaptersPageMapper";

export class CatalogService {

    static async getChapters(params: Record<string, unknown>): Promise<ChapterPage> {

        const response = await api.get<ChapterPageDTO>(
            "/catalogue/public/chapters",
            {params}
        );

        return mapChapterPage(response.data);
    }

    static async getChapter(chapterUuid: string): Promise<Chapter> {
        const response = await api.get<ChapterDTO>(
            `/catalogue/public/chapters/${chapterUuid}`
        );

        return mapChapter(response.data);
    }

    static async getSeries(params: { [k: string]: string | number; }): Promise<Page<Series>> {

        const response = await api.get<SeriesPageDTO>(
            `/catalogue/public/series/`,
            {params: params}
        );

        return mapSeriesPage(response.data);
    }

    static async getSeriesChapters(params: Record<string, string | number>, seriesUuid: string): Promise<Page<Chapter>> {

        const response = await api.get<ChapterPageDTO>(
            `/catalogue/public/series/${seriesUuid}/chapters`,
            {
                params
            }
        );

        return mapChapterPage(response.data);
    }


    static async getNextChapters(seriesUuid: string, chapterUuid: string, size: number = 3): Promise<Chapter[]> {

        const response = await api.get<ChapterDTO[]>(
            `/catalogue/public/series/${seriesUuid}/chapters/${chapterUuid}/next`,
            {
                params: {size}
            }
        );

        return response.data.map(mapChapter);
    }
}