import type {PageableDTO} from "@/types/PageableDTO";
import type {SortDTO} from "@/types/SortDTO";
import {Series} from "@/types/Series";

export interface SeriesPage {
    content: Series[];

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