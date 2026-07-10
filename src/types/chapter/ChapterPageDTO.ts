import type {ChapterDTO} from "./ChapterDTO";
import type {PageableDTO} from "../common/PageableDTO";
import type {SortDTO} from "../common/SortDTO";

export interface ChapterPageDTO {
    content: ChapterDTO[];

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