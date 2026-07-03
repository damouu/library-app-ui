import type {SortDTO} from "@/types/SortDTO";
import type {PageableDTO} from "@/types/PageableDTO";
import type {BorrowDTO} from "@/types/records/BorrowDTO";

export interface RecordResponse {
    content: BorrowDTO[];

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







