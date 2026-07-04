import type {PageableDTO} from "./PageableDTO";
import type {SeriesDTO} from "@/types/chapter/SeriesDTO";
import type {SortDTO} from "./SortDTO";

export interface SeriesPageDTO {
    content: SeriesDTO[];

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