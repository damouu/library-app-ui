import {defineStore} from 'pinia';
import {ref} from 'vue';
import {useUserStore} from "@/stores/User";
import {BorrowFlowService} from "@/services/BorrowFlowService";
import borrowHistory from "@/components/user/BorrowHistory.vue";
import type {CartItem} from "@/types/cart/CartItem";


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

        const exists = items.value.some(item => item.bookUuid === newItem.bookUuid);

        if (!exists) {
            items.value.push(newItem);
        }
    }

    function removeFromCart(chapterUuid: string) {
        items.value = items.value.filter(item => item.bookUuid !== chapterUuid);
    }

    function clearCart() {
        items.value = [];
    }

    async function borrow(): Promise<boolean> {

        if (!userStore.token) {
            alert("ログインしてください");
            return false;
        }

        isLoading.value = true;

        try {

            const {transaction, records} = await BorrowFlowService.borrow(items.value);

            lastTransaction.value = {...transaction.data, borrowedItems: [...items.value]};

            borrowHistory.value = records;

            clearCart();

            return true;

        } finally {
            isLoading.value = false;
        }
    }

    return {items, maxItems, addToCart, removeFromCart, clearCart, borrow, isLoading, lastTransaction};
});