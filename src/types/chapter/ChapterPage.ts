import type {Chapter} from "@/models/Chapter";
import type {PageableDTO} from "@/types/PageableDTO";
import type {SortDTO} from "@/types/SortDTO";

export interface ChapterPage {
    content: Chapter[];

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