import {inject, ref} from "vue";
import {defineStore} from 'pinia';
import {Book} from "@/types/Book";
import type {RouteParamValue} from "vue-router";
import type {AxiosInstance} from "axios";

export const useBookStore = defineStore('book', () => {
    // 1. Properly type the injected Axios instance
    const axios = inject<AxiosInstance>('axios')!;

    // 2. Fix Ref types (Remove the :number before the =)
    const pageNumber = ref(0);
    const sizeNumber = ref(20);

    // 3. Use Ref for a single object that starts empty
    const book = ref<Book | null>(null);

    // 4. Use Ref for arrays to avoid "assignment to constant" error
    const bookList = ref<Book[]>([]);
    const bookListTitle = ref<Book[]>([]);

    async function getBooks(page: number, size: number): Promise<void> {
        try {
            const response = await axios.get('/book', {
                params: {page, size}
            });
            // Clear and repopulate
            bookList.value = response.data.map((b: any) =>
                new Book(b.uuid, b.totalPages, b.title, b.publisher, b.genre, b.created_at, b.author)
            );
        } catch (e) {
            console.error(e);
        }
    }

    async function fetchMoreBooks(): Promise<void> {
        try {
            pageNumber.value += 1; // Correct way to increment ref
            const response = await axios.get('/book', {
                params: {page: pageNumber.value, size: sizeNumber.value}
            });

            response.data.forEach((b: any) => {
                bookList.value.push(new Book(b.uuid, b.totalPages, b.title, b.publisher, b.genre, b.created_at, b.author));
            });
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchMoreBooksTitle(title: string): Promise<number> {
        try {
            pageNumber.value += 1;
            const response = await axios.get('/book', {
                params: {page: pageNumber.value, size: sizeNumber.value, title}
            });

            response.data.forEach((b: any) => {
                bookListTitle.value.push(new Book(b.uuid, b.totalPages, b.title, b.publisher, b.genre, b.created_at, b.author));
            });
            return 200;
        } catch (e) {
            throw new Error("error");
        }
    }

    async function getBookUUID(uuid: string | RouteParamValue | RouteParamValue[]): Promise<void> {
        try {
            const response = await axios.get(`/book/${uuid}`);
            const data = response.data.book;

            // Re-assigning the ref value
            book.value = new Book(
                data.UUID,
                data.total_pages,
                data.title,
                data.publisher,
                data.genre,
                data.created_at,
                data.author
            );

            if (response.data.studentIdCard?.studentIdCardUUID) {
                book.value.studentIdCard = response.data.studentIdCard.studentIdCardUUID;
            }
        } catch (e) {
            console.error(e);
        }
    }

    return {
        bookList,
        fetchMoreBooks,
        getBooks,
        getBookUUID,
        book,
        bookListTitle,
        fetchMoreBooksTitle
    };
});