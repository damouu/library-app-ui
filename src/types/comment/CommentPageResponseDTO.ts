import type {CommentDTO} from "@/types/comment/CommentDTO";

export interface CommentPageResponseDTO {
    data: CommentDTO[];
    meta: {
        page: number;
        size: number;
        count: number;
        total: number;
        total_pages: number;
    };
}