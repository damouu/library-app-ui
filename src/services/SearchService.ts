import {api} from "@/plugins/gateway";
import {Chapter} from "@/models/Chapter";
import {mapSearchChapter} from "@/mappers/SearchChapterMapper";
import type {SearchChapterDTO} from "@/types/search/SearchChapterDTO";

export class SearchService {

    static async search(query: string): Promise<Chapter[]> {
        const response = await api.get("/search", {
            params: {
                q: query,
                page: 1,
                size: 6,
            },
        });

        return response.data.items.map(
            (item: SearchChapterDTO) => mapSearchChapter(item)
        );
    }
}