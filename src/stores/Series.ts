import {ref} from "vue";
import {defineStore} from "pinia";
import {Series} from "../types/Series";
import {api} from '@/plugins/gateway';

export const useSeriesStore = defineStore('Series', () => {
    const seriesList = ref<Series[]>([]);
    const isLoading = ref(false);

    async function getSeries(page: number, size: number, sort: string, direction: string): Promise<void> {
        isLoading.value = true;
        try {
            const response = await api.get(`/api/catalogue/public/series`, {
                params: {
                    page: page,
                    size: size,
                    sort: sort,
                    direction: direction
                }
            });

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

        } catch (error) {
            throw error;
        } finally {
            isLoading.value = false;
        }
    }

    return {seriesList, isLoading, getSeries};
});
