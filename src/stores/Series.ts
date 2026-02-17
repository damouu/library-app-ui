import {ref} from "vue";
import {defineStore} from "pinia";
import {Series} from "../types/Series";
import {api} from '@/plugins/gateway';

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

    async function getSeries(page: number, size: number, sort: string, direction: string, filters = {}): Promise<boolean> {
        isLoading.value = true;

        const params = {
            page,
            size,
            sort,
            direction,
            ...filters
        };

        const cleanParams = Object.fromEntries(
            Object.entries(params).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
        );

        try {
            const response = await api.get(`/api/catalogue/public/series`, {
                params: cleanParams
            });

            pagination.value = {
                totalPages: response.data.totalPages,
                totalElements: response.data.totalElements,
                currentPage: response.data.number,
                isLast: response.data.last,
                isFirst: response.data.first,
                pageSize: response.data.size
            };

            seriesList.value = response.data.content.map((item: any) => new Series(
                item.uuid,
                item.title,
                item.genre,
                item.coverArtworkUrl,
                item.illustrator,
                item.publisher,
                item.lastPrintPublicationDate,
                item.firstPrintPublicationDate,
                item.author,
            ));
            return true;
        } catch (error) {
            console.error("Filter failed", error);
            return false;
        } finally {
            isLoading.value = false;
        }
    }

    return {seriesList, isLoading, getSeries, pagination};
});
