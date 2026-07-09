import {defineStore} from "pinia";
import {Inventory} from "@/types/Inventory"
import {ref} from 'vue';
import {InventoryService} from "@/services/InventoryService";

export const useInventoryStore = defineStore('Inventory', () => {
    const currentChapter = ref<Inventory | null>(null);
    const isLoading = ref(false);

    async function checkAvailability(chapterUuid: string): Promise<void> {

        isLoading.value = true;

        try {

            currentChapter.value = await InventoryService.checkAvailability(chapterUuid);

        } finally {
            isLoading.value = false;
        }
    }

    return {isLoading, checkAvailability, currentChapter};
});
