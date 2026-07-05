import {api} from "@/plugins/gateway";
import {mapTopBorrowedChapter} from "@/mappers/TopBorrowedChapterMapper";
import type {TopBorrowedChapter} from "@/types/chapter/TopBorrowedChapter";
import type {TopBorrowedChapterDTO} from "@/types/analytics/TopBorrowedChapterDTO";
import type {PeriodKey} from "@/types/analytics/PeriodKey";
import type {Page} from "@/types/Pagination";


export class AnalyticService {

    static async getTop(period: PeriodKey, page: number, size: number,): Promise<Page<TopBorrowedChapter>> {

        const response = await api.get<Page<TopBorrowedChapterDTO>>(
            "/api/analytics/public/top-chapters",
            {
                params: {period, page, size}
            }
        );
        return {
            ...response.data,
            content: response.data.content.map(mapTopBorrowedChapter)
        };
    }
}