import type {SortDTO} from "@/types/SortDTO";
import type {PageableDTO} from "@/types/PageableDTO";

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