import type {SearchResponseDTO} from "@/types/search/SearchResponseDTO";

export function mapSearchPagination(response: SearchResponseDTO) {
    return {
        totalPages: response.total_pages,
        totalElements: response.total,
        currentPage: response.page - 1,
        isFirst: !response.has_prev,
        isLast: !response.has_next,
        pageSize: response.size,
    };
}