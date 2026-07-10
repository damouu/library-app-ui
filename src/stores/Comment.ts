import {ref} from "vue";
import {defineStore} from "pinia";
import {Comment} from "@/models/Comment"
import {CommentService} from "@/services/CommentService";

export const useCommentStore = defineStore('Comment', () => {

    const commentsList = ref<Comment[]>([]);

    const isLoading = ref(false);

    const pagination = ref({
        totalPages: 0,
        currentPage: 0,
        isLast: true,
        isFirst: true,
        totalElements: 0
    });


    async function getChapter(page: number, size: number, chapterUuid: string): Promise<void> {

        isLoading.value = true;

        try {

            const response = await CommentService.getChapter(page, size, chapterUuid);

            commentsList.value = response.comments;

            pagination.value = response.pagination;

        } finally {

            isLoading.value = false;
        }
    }

    async function postComment(chapterUuid: string, content: string): Promise<void> {

        isLoading.value = true;

        try {

            const comment = await CommentService.postComment(chapterUuid, content);

            commentsList.value.unshift(comment);

            if (commentsList.value.length > 5) {

                commentsList.value.pop();
            }

        } finally {

            isLoading.value = false;
        }
    }

    async function updateComment(uuid: string, content: string): Promise<boolean> {

        isLoading.value = true;

        try {

            await CommentService.updateComment(uuid, content);

        } finally {

            isLoading.value = false;

            return true
        }
    }


    async function deleteComment(commentUuid: string): Promise<void> {

        isLoading.value = true;

        try {

            await CommentService.deleteComment(commentUuid);

            const index = commentsList.value.findIndex(c => c.commentUuid === commentUuid);

            commentsList.value.splice(index, 1);

        } finally {

            isLoading.value = false;
        }
    }

    return {commentsList, isLoading, getChapter, pagination, postComment, deleteComment, updateComment};
});
