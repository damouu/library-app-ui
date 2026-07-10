import type {SortDTO} from "@/types/common/SortDTO";
import type {PageableDTO} from "@/types/common/PageableDTO";

export interface Page<T> {
    content: T[];

    pageable: PageableDTO;
    sort: SortDTO;

    totalPages: number;
    totalElements: number;

    size: number;
    number: number;

    first: boolean;
    last: boolean;

    numberOfElements: number;
    empty: boolean;
}