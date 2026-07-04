import {api} from "@/plugins/gateway";
import {mapTopBorrowedChapter} from "@/mappers/TopBorrowedChapterMapper";
import type {TopBorrowedChapter} from "@/types/chapter/TopBorrowedChapter";
import type {TopBorrowedChapterDTO} from "@/types/chapter/TopBorrowedChapterDTO";
import type {PeriodKey} from "@/types/analytics/PeriodKey";


export class AnalyticService {

    static async getTop(period: PeriodKey, page: number, size: number,): Promise<TopBorrowedChapter[]> {

        const response = await api.get<TopBorrowedChapterDTO[]>(
            "/api/analytics/public/top-chapters",
            {
                params: {
                    period, page, size
                }
            }
        );

        return response.data.map(mapTopBorrowedChapter);
    }
}