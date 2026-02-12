import {defineStore} from 'pinia';
import {ref} from 'vue';
import {api} from "@/plugins/gateway";
import {useUserStore} from "@/stores/User";


export interface CartItem {
    book_uuid: string;
    chapter: Chapter;
}

interface Chapter {
    chapter_uuid: string;
    chapter_title: string;
    chapter_second_title: string;
    chapter_number: number;
    chapter_cover_url: string;
}

export const useCartStore = defineStore('Cart', () => {
    const items = ref<CartItem[]>([]);
    const maxItems = 5;
    const userStore = useUserStore();
    const lastTransaction = ref<any>(null);
    const isLoading = ref(false);

    function addToCart(newItem: CartItem) {
        if (items.value.length >= maxItems) {
            alert("最大5冊までしか借りられません！");
            return;
        }

        const exists = items.value.some(item => item.book_uuid === newItem.book_uuid);

        if (!exists) {
            items.value.push(newItem);
        }
    }

    function removeFromCart(chapterUuid: string) {
        items.value = items.value.filter(item => item.book_uuid !== chapterUuid);
    }

    function clearCart() {
        items.value = [];
    }

    async function borrow(): Promise<boolean> {

        // isLoading.value = true;

        if (!userStore.token) {
            alert("ログインしてください (Please login to borrow)");
            return false;
        }

        const payload = {
            data: items.value.map(item => ({
                book_uuid: item.book_uuid,
                chapter: {
                    chapter_uuid: item.chapter.chapter_uuid,
                    chapter_title: item.chapter.chapter_title,
                    chapter_second_title: item.chapter.chapter_second_title,
                    chapter_number: item.chapter.chapter_number,
                    chapter_cover_url: item.chapter.chapter_cover_url
                }
            }))
        };

        try {

            isLoading.value = true;

            const response = await api.post(`/api/borrow/books`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userStore.token}`
                },
            });

            lastTransaction.value = {
                ...response.data.data,
                borrowedItems: [...items.value]
            };

            clearCart();
            userStore.getRecords(0, 5, "borrow_start_date", "desc");
            return true;

        } catch (error) {
            return false;
        } finally {
            isLoading.value = false;
        }
    }

    return {items, maxItems, addToCart, removeFromCart, clearCart, borrow, isLoading, lastTransaction};
});