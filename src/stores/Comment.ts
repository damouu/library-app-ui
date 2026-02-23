import {ref} from "vue";
import {defineStore} from "pinia";
import {Comment} from "@/types/Comment"
import {useUserStore} from "@/stores/User";
import {api} from '@/plugins/gateway';

export const useCommentStore = defineStore('Comment', () => {
    const commentsList = ref<Comment[]>([]);
    const isLoading = ref(false);
    const userStore = useUserStore();
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
            const response = await api.get(`/api/comment/public/chapter/${chapterUuid}`, {
                params: {
                    page: page,
                    size: size
                }
            });

            commentsList.value = response.data.data.map((item: any) => new Comment(
                item.chapterUuid,
                item.commentUuid,
                item.content,
                item.deletedAt,
                item.createdAt,
                item.updatedAt,
                item.userName,
                item.avatar_URL
            ));

            const meta = response.data.meta;

            pagination.value = {

                currentPage: meta.Page - 1,
                totalPages: Math.ceil(meta.total / meta.Size),
                isFirst: meta.Page === 1,
                isLast: meta.Page >= Math.ceil(meta.total / meta.Size),
                totalElements: meta.total
            };

        } catch (error) {
            throw error;
        } finally {
            isLoading.value = false;
        }
    }

    async function postComment(chapterUuid: string, content: string): Promise<void> {
        isLoading.value = true;

        try {
            const response = await api.post(
                `/api/comment/chapter/${chapterUuid}`,
                {
                    comment: content
                },
                {
                    headers: {
                        'Authorization': `Bearer ${userStore.token}`
                    }
                }
            );

            if (response.status === 201 || response.data === true) {

                const commentPosted: Comment = {
                    chapterUuid: chapterUuid,
                    userName: userStore.currentUser.name,
                    avatar_URL: userStore.currentUser.avatar_img_url,
                    createdAt: new Date().toISOString(),
                    content: content,
                };

                commentsList.value.unshift(commentPosted);

                if (commentsList.value.length > 5) {
                    commentsList.value.pop();
                }
            }

        } catch (error) {
            console.error("Comment post failed:", error);
            throw error;
        } finally {
            isLoading.value = false;
        }
    }

    return {commentsList, isLoading, getChapter, pagination, postComment};
});
