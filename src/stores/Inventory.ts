import {defineStore} from "pinia";
import {Inventory} from "@/types/Inventory"
import {ref} from 'vue';
import {api} from '@/plugins/gateway';

export const useInventoryStore = defineStore('Inventory', () => {
    const currentChapter = ref<Inventory | null>(null);
    const isLoading = ref(false);

    async function checkAvailability(chapterUuid: string): Promise<void> {

        isLoading.value = true;

        try {
            const response = await api.get(`/api/inventory/public/${chapterUuid}`);

            currentChapter.value = new Inventory(
                response.data.bookUuID,
                response.data.chapterUuID,
                response.data.currentlyBorrowed,
            );

        } catch (error) {
            currentChapter.value = null;
        } finally {
            isLoading.value = false;
        }
    }

    return {isLoading, checkAvailability, currentChapter};
});
