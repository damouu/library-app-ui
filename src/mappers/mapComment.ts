import {Comment} from "@/models/Comment";
import type {CommentDTO} from "@/types/comment/CommentDTO";

export function mapComment(dto: CommentDTO): Comment {
    return new Comment(
        dto.chapterUuid,
        dto.commentUuid,
        dto.content,
        dto.deletedAt ?? "",
        dto.createdAt,
        dto.updatedAt ?? "",
        dto.userName,
        dto.avatar_URL
    );
}