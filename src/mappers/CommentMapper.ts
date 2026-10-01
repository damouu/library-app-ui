import {mapComment} from "./mapComment";
import type {CommentPageResponseDTO} from "@/types/comment/CommentPageResponseDTO";
import type {CommentPage} from "@/types/comment/CommentPage";

export function mapCommentPage(dto: CommentPageResponseDTO): CommentPage {
    return {
        comments: dto.data.map(mapComment),

        pagination: {
            currentPage: dto.meta.page - 1,
            totalPages: dto.meta.total_pages,
            totalElements: dto.meta.total,
            isFirst: dto.meta.page === 1,
            isLast: dto.meta.page >= dto.meta.total_pages,
        }
    };
}