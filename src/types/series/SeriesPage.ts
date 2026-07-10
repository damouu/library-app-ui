import type {PageableDTO} from "@/types/common/PageableDTO";
import type {SortDTO} from "@/types/common/SortDTO";
import {Series} from "@/models/Series";

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