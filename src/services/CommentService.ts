import {api} from "@/plugins/gateway";
import {mapComment} from "@/mappers/mapComment";
import {mapCommentPage} from "@/mappers/CommentMapper";
import {Comment} from "@/models/Comment";
import type {CommentPageResponseDTO} from "@/types/comment/CommentPageResponseDTO";
import type {CommentPage} from "@/types/comment/CommentPage";
import type {CommentCreatedResponseDTO} from "@/types/comment/CommentCreatedResponseDTO";

export class CommentService {

    static async getChapter(page: number, size: number, chapterUuid: string): Promise<CommentPage> {

        const response = await api.get<CommentPageResponseDTO>(
            `/api/comment/public/chapter/${chapterUuid}`,
            {
                params: {page, size}
            }
        );

        return mapCommentPage(response.data);
    }

    static async postComment(chapterUuid: string, content: string): Promise<Comment> {

        const response = await api.post<CommentCreatedResponseDTO>(
            `/api/comment/chapter/${chapterUuid}`,
            {
                comment: content
            }
        );

        return mapComment(response.data);
    }

    static async updateComment(uuid: string, content: string): Promise<void> {

        await api.put(
            `/api/comment/${uuid}`,
            {
                comment: content
            }
        );

    }

}