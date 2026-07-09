import type {CommentDTO} from "@/types/comment/CommentDTO";

export interface CommentPageResponseDTO {
    data: CommentDTO[];
    meta: {
        Page: number;
        Size: number;
        count: number;
        total: number;
    };
}