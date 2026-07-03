import type {SortDTO} from "@/types/SortDTO";

export interface PageableDTO {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
    sort: SortDTO;
}