import {reactive, ref} from "vue";
import {defineStore} from "pinia";
import {Chapter} from "@/models/Chapter"
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

    const newsLoading = ref(false);
    const rankingLoading = ref(false);
    const loadingNext = ref(false);

    const pagination = ref({
        totalPages: 0,
        totalElements: 0,
        currentPage: 0,
        isLast: false,
        isFirst: true,
        pageSize: 12
    });

    async function getSeriesChapters(page: number, size: number, sort: string, seriesUuid: string): Promise<void> {

        isLoading.value = true;

        try {

            const response = await CatalogService.getSeriesChapters({page, size, sort}, seriesUuid);

            seriesList.value = response.content;

            pagination.value = mapPagination(response);

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

        newsLoading.value = true;

        try {

            const params = {page, size, sort};

            const cleanParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== "" && v !== null && v !== undefined));

            const chapterPage = await CatalogService.getChapters(cleanParams);

            Chapters.value = chapterPage.content;

            pagination.value = mapPagination(chapterPage);

        } finally {

            newsLoading.value = false;
        }
    }


    async function getChapter(page: number, size: number, sort: string, direction: string, filters = {}): Promise<void> {

        isLoading.value = true;

        try {

            const params = {page, size, sort: direction ? `${sort},${direction}` : sort, ...filters};

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

        if (rankings[period]?.length) {
            return;
        }

        rankingLoading.value = true;

        try {

            const chapters = await AnalyticService.getTop(period, page, size);

            rankings[period] = chapters.content;

        } finally {

            rankingLoading.value = false;

        }
    }

    async function getNextThreeChapters(seriesUuid: string, chapterUuid: string) {

        try {

            loadingNext.value = true;

            newChapters.value = await CatalogService.getNextChapters(seriesUuid, chapterUuid);

        } catch {

            newChapters.value = [];

        } finally {

            loadingNext.value = false;
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
        loadingNext,
        newChapters,
        newsLoading,
        rankingLoading,
        getChapter,
        Chapters,
        getNews
    };
});
