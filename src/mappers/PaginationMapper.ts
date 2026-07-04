import type {Page} from "@/types/Pagination";

export function mapPagination<T>(page: Page<T>) {
    return {
        totalPages: page.totalPages,
        totalElements: page.totalElements,
        currentPage: page.number,
        isLast: page.last,
        isFirst: page.first,
        pageSize: page.size
    };
}