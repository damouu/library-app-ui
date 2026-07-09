import type {SortDTO} from "@/types/SortDTO";
import type {PageableDTO} from "@/types/PageableDTO";
import type {CommentDTO} from "@/types/comment/CommentDTO";

export interface CommentResponse {
    data: CommentDTO[];

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