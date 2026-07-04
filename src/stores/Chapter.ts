import {reactive, ref} from "vue";
import {defineStore} from "pinia";
import {Chapter} from "@/models/Chapter"
import {api} from '@/plugins/gateway';
import {AnalyticService} from "@/services/AnalyticService";
import type {TopBorrowedChapter} from "@/types/chapter/TopBorrowedChapter";
import type {PeriodKey} from "@/types/analytics/PeriodKey";
import {CatalogService} from "@/services/CatalogService";
import {mapPagination} from "@/mappers/PaginationMapper";


export const useChapterStore = defineStore('Chapter', () => {
    const seriesList = ref<Chapter[]>([]);
    const currentChapter = ref<Chapter | null>(null);
    const nextChapters = ref<Chapter | null>(null);
    const newChapters = ref<Chapter[] | null>(null);
    const Chapters = ref<Chapter[] | null>(null);

    const rankings = reactive<Record<PeriodKey, TopBorrowedChapter[] | null>>({
        CURRENT_WEEK: null,
        LAST_WEEK: null,
        LAST_MONTH: null
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
                item.summary,
                item.publicationDate,
                item.book_uuid,
                item.series
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
            currentChapter.value = await CatalogService.getChapter(chapterUuid);
        } finally {
            isLoading.value = false;
        }
    }


    async function getNews(page: number, size: number, sort: string): Promise<void> {

        isLoading.value = true;

        try {
            const params = {page, size, sort};

            const cleanParams = Object.fromEntries(
                Object.entries(params).filter(([_, v]) =>
                    v !== "" && v !== null && v !== undefined
                )
            );

            const chapterPage = await CatalogService.getChapters(cleanParams);

            Chapters.value = chapterPage.content;
            pagination.value = mapPagination(chapterPage);

        } catch (error) {
            throw error;
        } finally {
            isLoading.value = false;
        }
    }


    async function getChapter(page: number, size: number, sort: string, direction: string, filters = {}): Promise<void> {

        isLoading.value = true;

        try {
            const params = {page, size, sort, direction, ...filters};

            const cleanParams = Object.fromEntries(
                Object.entries(params).filter(([_, v]) =>
                    v !== "" && v !== null && v !== undefined
                )
            );

            const chapterPage = await CatalogService.getChapters(cleanParams);

            Chapters.value = chapterPage.content;
            pagination.value = mapPagination(chapterPage);

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

            const chapters = await AnalyticService.getTop(period, page, size);

            rankings[period] = chapters;

        } catch (error) {
            console.error(error);

        } finally {
            isLoading.value = false;
        }
    }

    async function getNextThreeChapters(currentChapterNumber: number, seriesUuid: string) {
        const size = 3;
        const collected: Chapter[] = [];


        let apiPage = Math.ceil(currentChapterNumber / size) - 1;

        if (apiPage < 0) apiPage = 0;

        try {
            const response = await api.get(`/api/catalogue/public/series/${seriesUuid}/chapters`, {
                params: {page: apiPage, size: size}
            });

            const chapters = response.data.content;

            const followers = chapters.filter((c: {
                chapterNumber: number;
            }) => c.chapterNumber > currentChapterNumber);
            collected.push(...followers);


            if (collected.length < 3) {
                const nextRes = await api.get(`/api/catalogue/public/series/${seriesUuid}/chapters`, {
                    params: {page: apiPage + 1, size: size}
                });
                if (nextRes.data?.content) {
                    collected.push(...nextRes.data.content);
                }
            }

            newChapters.value = collected.slice(0, 3);

        } catch (error) {
            console.error("Gallery fetch failed:", error);
            newChapters.value = [];
        }
    }

    return {
        getNextThreeChapters,
        nextChapters,
        seriesList,
        isLoading,
        getSeriesChapters,
        pagination,
        getChapters,
        currentChapter,
        getTop,
        rankings,
        newChapters,
        getChapter,
        Chapters,
        getNews
    };
});
