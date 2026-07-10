import type {SortDTO} from "@/types/common/SortDTO";

export interface PageableDTO {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
    sort: SortDTO;
}