import {ref} from "vue";
import {defineStore} from "pinia";
import {Comment} from "@/types/Comment"
import {api} from '@/plugins/gateway';

export const useCommentStore = defineStore('Comment', () => {
    const commentsList = ref<Comment[]>([]);
    const isLoading = ref(false);
    const pagination = ref({
        totalPages: 0,
        currentPage: 0,
        isLast: true,
        isFirst: true
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
                totalPages: meta.total - 4,
                currentPage: meta.Page - 1,
                isLast: meta.Page >= meta.total,
                isFirst: meta.Page === 1
            };

        } catch (error) {
            throw error;
        } finally {
            isLoading.value = false;
        }
    }

    return {commentsList, isLoading, getChapter, pagination};
});
