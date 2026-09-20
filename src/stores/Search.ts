import {defineStore} from 'pinia';
import {ref} from 'vue';
import {SearchService} from '@/services/SearchService';
import type {Chapter} from '@/models/Chapter';

export const useSearchStore = defineStore('Search', () => {
    const results = ref<Chapter[]>([]);
    const isLoading = ref(false);

    async function search(query: string): Promise<void> {
        isLoading.value = true;

        try {
            results.value = await SearchService.search(query);
        } finally {
            isLoading.value = false;
        }
    }

    function clearResults(): void {
        results.value = [];
    }

    return {results, isLoading, search, clearResults,};
});