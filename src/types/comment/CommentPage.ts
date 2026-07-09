import {Comment} from "@/models/Comment";

export interface CommentPage {

    comments: Comment[];

    pagination: {
        currentPage: number;
        totalPages: number;
        totalElements: number;
        isFirst: boolean;
        isLast: boolean;
    };
}