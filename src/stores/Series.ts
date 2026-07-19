import {ref} from "vue";
import {defineStore} from "pinia";
import {Series} from "../models/Series";
import {CatalogService} from "@/services/CatalogService";
import {mapPagination} from "@/mappers/PaginationMapper";

export const useSeriesStore = defineStore('Series', () => {

    const seriesList = ref<Series[]>([]);

    const isLoading = ref(false);

    const pagination = ref({
        totalPages: 0,
        totalElements: 0,
        currentPage: 0,
        isLast: false,
        isFirst: true,
        pageSize: 12
    });

    async function getSeries(page: number, size: number | null, sort: string, filters = {}): Promise<boolean> {

        isLoading.value = true;

        const pageSize = size ?? 12;

        try {

            const params = {page, size: pageSize, sort, ...filters};

            const cleanParams = Object.fromEntries(
                Object.entries(params).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
            );

            const seriesPage = await CatalogService.getSeries(cleanParams);

            seriesList.value = seriesPage.content;

            pagination.value = mapPagination(seriesPage);

            return true;

        } finally {

            isLoading.value = false;
        }
    }

    return {seriesList, isLoading, getSeries, pagination};
});
