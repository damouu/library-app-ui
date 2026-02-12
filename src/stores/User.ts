import {computed, ref} from "vue";
import {defineStore} from "pinia";
import {api} from '@/plugins/gateway';
import {User} from "@/types/User";
import {Chapter} from "@/types/Chapter";

export const useUserStore = defineStore('user', () => {

    const currentUser = ref<User | null>(null);

    const authError = ref<string | null>(null);

    const token = ref<string | null>(localStorage.getItem('user_token'));

    const borrowHistory = ref<any>(null);

    const isAuthenticated = computed(() => currentUser.value !== null);

    const isLoading = ref(false);

    const recordsLoading = ref(false);


    function logout() {
        currentUser.value = null;
        token.value = null;
        localStorage.removeItem('user_token');
    }


    async function signIn(email: string, password: string): Promise<void> {
        isLoading.value = true;
        authError.value = null;
        try {
            const base64Credentials = window.btoa(`${email}:${password}`);

            const response = await api.post(`/api/auth/login`, {}, {
                headers: {
                    'Authorization': `Basic ${base64Credentials}`
                },
            });

            token.value = response.data.access_token;

            localStorage.setItem('user_token', response.data.access_token);

            await getProfile();
            await getRecords(0, 5, "borrow_start_date", "desc");

        } catch (error: any) {
            authError.value = "メールアドレスまたはパスワードが正しくありません。";
            throw error;
        } finally {
            isLoading.value = false;
        }
    }


    async function getProfile(): Promise<void> {
        if (!token.value) return;

        isLoading.value = true;
        try {
            const response = await api.get(`/api/auth/profile`, {
                headers: {
                    'Authorization': `Bearer ${token.value}`
                }
            });

            const d = response.data;

            currentUser.value = new User(
                d.user.card_uuid,
                d.user.user_name,
                d.user.email,
                d.user.avatar_img_url,
                d.user.last_logged_in_at
            );


        } catch (error: any) {
            authError.value = "メールアドレスまたはパスワードが正しくありません。";
            throw error;
        } finally {
            isLoading.value = false;
        }
    }

    async function getRecords(page: number, size: number, sort: string, direction: string,): Promise<void> {
        recordsLoading.value = true;
        if (!token.value) return;

        try {
            const response = await api.get(`/api/records`, {
                headers: {'Authorization': `Bearer ${token.value}`},
                params: {
                    page: page,
                    size: size,
                    sort: sort,
                    direction: direction
                }
            });

            const rawData = response.data;

            const transformedBorrows = Object.entries(rawData.borrows_UUID).map(([uuid, record]: [string, any]) => {
                return {
                    uuid: uuid,
                    startDate: record.borrow_start_date,
                    expectedEndDate: record.borrow_expected_end_date,
                    actualReturnDate: record.borrow_return_date,
                    chapters: record.chapters.map((c: any) => new Chapter(
                        c.chapter_uuid,
                        c.chapter_title,
                        c.chapter_second_title,
                        null,
                        c.chapter_number,
                        c.chapter_cover_url,
                        null,
                        c.book_uuid
                    ))
                };
            });

            borrowHistory.value = {
                ...rawData,
                borrows: transformedBorrows
            };

        } catch (error) {
        } finally {
            recordsLoading.value = false;
        }
    }

    async function returnBorrow(borrowUuid: string): Promise<boolean> {

        isLoading.value = true;

        const record = borrowHistory.value.borrows.find((b: any) => b.uuid === borrowUuid);

        if (!record) {
            console.error("Record not found in local state.");
            return false;
        }

        const payload = {
            data: record.chapters.map((chapter: Chapter) => ({
                book_uuid: chapter.bookUuid,
                chapter: {
                    chapter_uuid: chapter.uuid,
                    chapter_title: chapter.title,
                    chapter_second_title: chapter.secondTitle,
                    chapter_number: chapter.chapterNumber,
                    chapter_cover_url: chapter.coverArtworkUrl
                }
            }))
        };

        try {
            await api.post(`/api/borrow/${borrowUuid}/return`, payload, {
                headers: {'Authorization': `Bearer ${token.value}`}
            });

            await getRecords(0, 5, "borrow_start_date", "desc");

            return true;

        } catch (error) {
            return false;
        } finally {
            isLoading.value = false;
        }
    }


    return {
        signIn,
        logout,
        currentUser,
        isAuthenticated,
        isLoading,
        token,
        getProfile,
        authError,
        getRecords,
        borrowHistory,
        returnBorrow,
        recordsLoading
    };

});


