export interface CommentDTO {
    userName: string;
    chapterUuid: string;
    commentUuid: string;
    avatar_URL: string;
    content: string;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string | null;
}