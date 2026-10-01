export interface CommentDTO {
    user_name: string;
    chapter_uuid: string;
    comment_uuid: string;
    avatar_url: string | null;
    content: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string | null;
}