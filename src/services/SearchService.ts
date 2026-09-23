import {api} from "@/plugins/gateway";
import type {Chapter} from "@/models/Chapter";
import {mapSearchChapter} from "@/mappers/SearchChapterMapper";
import {mapSearchPagination} from "@/mappers/SearchPaginationMapper";

import type {SearchResponseDTO} from "@/types/search/SearchResponseDTO";

export interface SearchPagination {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    isFirst: boolean;
    isLast: boolean;
    pageSize: number;
}

export interface SearchResponse {
    results: Chapter[];
    pagination: SearchPagination;
}

export class SearchService {

    static async search(query: string, page: number, size: number): Promise<SearchResponse> {

        const response = await api.get<SearchResponseDTO>("/search", {
            params: {
                q: query,
                page: page + 1,
                size,
            },
        });

        const data = response.data;

        return {
            results: data.items.map(mapSearchChapter),
            pagination: mapSearchPagination(data),
        };
    }
}