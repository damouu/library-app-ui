export interface Pagination {
    totalPages: number;
    totalElements: number;
    currentPage: number;
    isLast: boolean;
    isFirst: boolean;
    pageSize: number;
}