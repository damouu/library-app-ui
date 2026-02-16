import {reactive, ref} from "vue";
import {defineStore} from "pinia";
import {Chapter} from "@/types/Chapter"
import {api} from '@/plugins/gateway';

export const useChapterStore = defineStore('Chapter', () => {
    const seriesList = ref<Chapter[]>([]);
    const currentChapter = ref<Chapter | null>(null);
    const newChapters = ref<Chapter[] | null>(null);

    type PeriodKey = 'week' | 'lastweek' | 'lastmonth';

    const rankings = reactive<Record<PeriodKey, Chapter[] | null>>({
        week: null,
        lastweek: null,
        lastmonth: null
    });

    const isLoading = ref(false);

    const pagination = ref({
        totalPages: 0,
        totalElements: 0,
        currentPage: 0,
        isLast: false,
        isFirst: true,
        pageSize: 12
    });

    async function getSeriesChapters(page: number, size: number, sort: string, direction: string, seriesUuid: string): Promise<void> {
        isLoading.value = true;
        try {
            const response = await api.get(`/api/catalogue/public/series/${seriesUuid}/chapters`, {
                params: {
                    page: page,
                    size: size,
                    sort: sort,
                    direction: direction
                }
            });

            seriesList.value = response.data.content.map((item: any) => new Chapter(
                item.uuid,
                item.title,
                item.secondTitle,
                item.totalPages,
                item.chapterNumber,
                item.coverArtworkUrl,
                item.publicationDate,
                null
            ));

            pagination.value = {
                totalPages: response.data.totalPages,
                totalElements: response.data.totalElements,
                currentPage: response.data.number,
                isLast: response.data.last,
                isFirst: response.data.first,
                pageSize: response.data.size
            };

        } catch (error) {
            throw error;
        } finally {
            isLoading.value = false;
        }
    }


    async function getChapters(chapterUuid: string): Promise<void> {
        isLoading.value = true;
        try {
            const response = await api.get(`/api/catalogue/public/chapters/${chapterUuid}`, {});

            const item = response.data;

            currentChapter.value = new Chapter(
                item.uuid,
                item.title,
                item.secondTitle,
                item.totalPages,
                item.chapterNumber,
                item.coverArtworkUrl,
                item.publicationDate,
                null
            );

        } catch (error) {
            throw error;
        } finally {
            isLoading.value = false;
        }
    }

    async function getNews(page: number, size: number, recent: string, direction: string,): Promise<void> {

        isLoading.value = true;

        try {
            const response = await api.get(`/api/catalogue/public/chapters`, {
                params: {
                    page: page,
                    size: size,
                    recent: recent,
                    direction: direction
                }
            });


            newChapters.value = response.data.content.map((item: any) => new Chapter(
                item.uuid,
                item.title,
                item.secondTitle,
                item.totalPages,
                item.chapterNumber,
                item.coverArtworkUrl,
                item.publicationDate,
                null
            ));

            pagination.value = {
                totalPages: response.data.totalPages,
                totalElements: response.data.totalElements,
                currentPage: response.data.number,
                isLast: response.data.last,
                isFirst: response.data.first,
                pageSize: response.data.size
            };

        } catch (error) {
            throw error;
        } finally {
            isLoading.value = false;
        }
    }


    async function getTop(period: PeriodKey, page: number, size: number): Promise<void> {

        isLoading.value = true;

        if (rankings[period]?.length) {
            return;
        }

        try {
            const response = await api.get(`/api/analytics/public/top-chapters`, {
                params: {
                    page: page,
                    size: size,
                    period: period
                }
            });


            const item = response.data;

            const chapterArray = item.map((item: any) => new Chapter(
                item.chapterUuid,
                item.chapterTitle,
                item.chapterSecondTitle,
                null,
                item.chapterNumber,
                item.chapterCoverUrl,
                null,
                null
            ));

            rankings[period] = chapterArray;

        } catch (error) {
            throw error;
        } finally {
            isLoading.value = false;
        }
    }


    return {
        seriesList,
        isLoading,
        getSeriesChapters,
        pagination,
        getChapters,
        currentChapter,
        getTop,
        rankings,
        newChapters,
        getNews
    };
});
