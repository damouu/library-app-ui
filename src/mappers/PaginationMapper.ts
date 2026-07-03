import type {ChapterPage} from "@/types/chapter/ChapterPage";
import type {Pagination} from "@/types/Pagination";

export function mapPagination(page: ChapterPage): Pagination {
    return {
        totalPages: page.totalPages,
        totalElements: page.totalElements,
        currentPage: page.number,
        isLast: page.last,
        isFirst: page.first,
        pageSize: page.size
    };
}