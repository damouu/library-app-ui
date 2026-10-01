import {Comment} from "@/models/Comment";
import type {CommentDTO} from "@/types/comment/CommentDTO";

export function mapComment(dto: CommentDTO): Comment {
    return new Comment(
        dto.chapter_uuid,
        dto.comment_uuid,
        dto.content,
        dto.deleted_at,
        dto.created_at,
        dto.updated_at,
        dto.user_name,
        dto.avatar_url
    );
}