import {defineStore} from "pinia";
import {ref, shallowRef} from "vue";

import type {SearchPagination} from "@/services/SearchService";
import {SearchService} from "@/services/SearchService";
import type {Chapter} from "@/models/Chapter";

export const useSearchStore = defineStore("Search", () => {
    const results = shallowRef<Chapter[]>([]);
    const pagination = ref<SearchPagination | null>(null);

    const isLoading = ref(false);

    async function search(query: string, page: number): Promise<void> {
        isLoading.value = true;

        try {
            const response = await SearchService.search(
                query,
                page,
                6
            );

            results.value = response.results;
            pagination.value = response.pagination;
        } finally {
            isLoading.value = false;
        }
    }

    function clearResults(): void {
        results.value = [];
        pagination.value = null;
    }

    return {
        results,
        pagination,
        isLoading,
        search,
        clearResults,
    };
});