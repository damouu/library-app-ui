import {defineStore} from 'pinia';
import {ref} from 'vue';
import {api} from "@/plugins/gateway";


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

    async function borrow(): Promise<void> {

        isLoading.value = true;

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
                    'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJsaWJyYXJ5LWFwcC1hdXRoIiwiYXVkIjoibGlicmFyeS1hcHAtYm9ycm93Iiwic3ViIjoiNjk3YjVhZTY3NTgyYmQwNzJhMGZmMmIyIiwidXNlcl9tZW1iZXJDYXJkVVVJRCI6ImUxMzU0OTM2LWEwYmUtNGZlMS04NWRmLWRjOTY3YmIxMGMxYiIsImF2YXRhcl9pbWdfdXJsIjoiaHR0cHM6Ly9hdmF0YXIuaXJhbi5saWFyYS5ydW4vdXNlcm5hbWU_dXNlcm5hbWU9QmVuYWRkaV9hY2NvdW50K0JlbmFkZGkiLCJuYW1lIjoiQmVuYWRkaV9hY2NvdW50IiwiZW1haWwiOiJCZW5hZGRpQGdtYWlsLmNvbSIsImlhdCI6MTc3MDMyNjg2MSwibmJmIjoxNzcwMzI2ODYxLCJleHAiOjE3NzAzMzA0NjF9.Subd11pkmWNCaPKG5b8L9tlVXU81nB-t4Qwkni7Yveeht2VipAfNafMTRI1faYEgjmc0NezqUvUIfzW0hd0aW9dz6F8cDZv37KlDs40T_cksiQe75cvjXKNIM69z-Gl0tubg5Q1664Xkx0QE8vo1T2QdDYjYO4PToR9Em4s9hgceZRyGQoXuwUeOykpO9ANCzrG2LhDSglck5-Bgu0DG5JcA0nH-fpCN4yIMhvjC0kvYpPWvgcfxrfG6FI97IA26zdiBo_Zoiugw4b85xmOzFfK9WehChiKx8GRb1j-HTspXT4uQMZ29RgaGx47rgVXVlCovfWWDE_GELxxnBqoe5Q`
                },
            });
            
        } catch (error) {
        } finally {
            isLoading.value = false;
        }
    }

    return {items, maxItems, addToCart, removeFromCart, clearCart, borrow};
});