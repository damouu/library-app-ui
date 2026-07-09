export interface CommentCreatedResponseDTO {
    memberCardUuid: string;
    userName: string;
    userEmail: string;
    chapterUuid: string;
    commentUuid: string;
    avatar_URL: string;
    content: string;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string | null;
}