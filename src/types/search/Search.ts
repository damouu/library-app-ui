import type {SearchChapterDTO} from "@/types/search/SearchChapterDTO";

export interface SearchApiResponse {
    items: SearchChapterDTO[];
    page: number;
    size: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
}