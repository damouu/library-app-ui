import {defineStore} from "pinia";
import {ref, shallowRef} from "vue";
import {SearchService} from "@/services/SearchService";
import type {Chapter} from "@/models/Chapter";

export interface SearchHistoryItem {
    query: string;
    searchedAt: number;
}

const SEARCH_HISTORY_KEY = "library-search-history";
const MAX_HISTORY_ITEMS = 10;

export const useDiscoverySearchStore = defineStore(
    "DiscoverySearch",
    () => {
        const results = shallowRef<Chapter[]>([]);
        const isLoading = ref(false);

        const history = ref<SearchHistoryItem[]>([]);

        async function search(query: string): Promise<void> {
            const trimmedQuery = query.trim();

            if (!trimmedQuery) {
                clearResults();
                return;
            }

            isLoading.value = true;

            try {
                const response = await SearchService.search(trimmedQuery, 0, 6);

                results.value = response.results;
            } finally {
                isLoading.value = false;
            }
        }

        function clearResults(): void {
            results.value = [];
        }


        function loadHistory(): void {
            const storedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);

            if (!storedHistory) {
                return;
            }

            try {
                const parsedHistory = JSON.parse(storedHistory);

                if (Array.isArray(parsedHistory)) {
                    history.value = parsedHistory;
                }
            } catch {
                localStorage.removeItem(SEARCH_HISTORY_KEY);
            }
        }

        function persistHistory(): void {
            localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history.value));
        }

        function addToHistory(query: string): void {
            const normalizedQuery = query.trim();

            if (!normalizedQuery) {
                return;
            }

            history.value = history.value.filter(item => item.query !== normalizedQuery);

            history.value.unshift({
                query: normalizedQuery,
                searchedAt: Date.now(),
            });


            history.value = history.value.slice(
                0,
                MAX_HISTORY_ITEMS
            );

            persistHistory();
        }

        function clearHistory(): void {
            history.value = [];

            localStorage.removeItem(SEARCH_HISTORY_KEY);
        }

        loadHistory();

        return {results, isLoading, search, clearResults, history, addToHistory, clearHistory,};
    }
);