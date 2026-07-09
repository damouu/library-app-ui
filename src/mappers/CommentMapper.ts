import {mapComment} from "./mapComment";
import type {CommentPageResponseDTO} from "@/types/comment/CommentPageResponseDTO";
import type {CommentPage} from "@/types/comment/CommentPage";

export function mapCommentPage(dto: CommentPageResponseDTO): CommentPage {

    return {

        comments: dto.data.map(mapComment),

        pagination: {
            currentPage: dto.meta.Page - 1,
            totalPages: Math.ceil(dto.meta.total / dto.meta.Size),
            totalElements: dto.meta.total,
            isFirst: dto.meta.Page === 1,
            isLast: dto.meta.Page >= Math.ceil(dto.meta.total / dto.meta.Size),
        }
    };
}