import {computed, ref} from "vue";
import {defineStore} from "pinia";
import {User} from "@/models/User";
import {AuthFlowService} from "@/services/AuthFlowService";
import {AuthService} from "@/services/AuthService";
import {BorrowService} from "@/services/BorrowService";
import {mapValidationErrors} from "@/mappers/ValidationErrorMapper";
import type {RecordResponse} from "@/types/records/RecordResponse";
import {RecordService} from "@/services/RecordService";
import type {BorrowDTO} from "@/types/records/BorrowDTO";

export const useUserStore = defineStore('user', () => {

    const currentUser = ref<User | null>(null);

    const authError = ref<string | null>(null);

    const token = ref<string | null>(localStorage.getItem('user_token'));

    const borrowHistory = ref<RecordResponse | null>(null);

    const isAuthenticated = computed(() => currentUser.value !== null);

    const isLoading = ref(false);

    const recordsLoading = ref(false);

    const validationErrors = ref<Record<string, string[]>>({});

    const hasUnreturnedBorrows = computed(() => {
        return borrowHistory.value?.content.some(
            borrow => borrow.borrowReturnDate === null
        ) ?? false;
    });


    const hasBorrowedOrReturnedToday = computed(() => {

        if (!borrowHistory.value || !borrowHistory.value.content) return false;

        const today = new Date().toISOString().split('T')[0];

        return borrowHistory.value.content.some(borrow => {
            const isBorrowedToday = borrow.borrowStartDate.startsWith(today);

            const isReturnedToday = borrow.borrowReturnDate && borrow.borrowReturnDate.startsWith(today);

            return isBorrowedToday || isReturnedToday;
        });
    });


    function logout() {
        clearAuthentication();
    }

    async function signIn(email: string, password: string) {
        isLoading.value = true;

        try {
            const {user, token: accessToken} =
                await AuthFlowService.login(email, password);

            authenticate(user, accessToken);

            borrowHistory.value = await RecordService.getRecords(0, 5);

        } finally {
            isLoading.value = false;
        }
    }

    async function register(user_name: string, email: string, password: string, password_confirmation: string) {

        isLoading.value = true;
        authError.value = null;

        try {

            const {
                token: accessToken,
                user
            } = await AuthService.signUp(user_name, email, password, password_confirmation);

            authenticate(user, accessToken);

            borrowHistory.value = createEmptyBorrowHistory();

        } catch (error: any) {

            if (error.response?.status === 422) {
                validationErrors.value =
                    mapValidationErrors(error.response.data.errors);
            } else {
                authError.value = "登録に失敗しました。";
            }

            throw error;

        } finally {
            isLoading.value = false;
        }
    }

    async function returnBorrow(borrowUuid: string) {

        isLoading.value = true;
        authError.value = null;

        try {

            const returnedBorrow = await BorrowService.return(borrowUuid);

            const borrow = borrowHistory.value?.content.find(
                b => b.borrowUuid === borrowUuid
            );

            if (borrow) {
                borrow.borrowReturnDate = returnedBorrow.returnDate;
                borrow.returnLately = returnedBorrow.isLate;
                borrow.daysLate = returnedBorrow.daysLate;
                borrow.lateFee = returnedBorrow.fineAmount;
            }
            return returnedBorrow;

        } catch (error) {
            throw error;
        } finally {
            isLoading.value = false;
        }
    }

    function authenticate(user: User, accessToken: string) {
        token.value = accessToken;
        currentUser.value = user;
        localStorage.setItem("user_token", accessToken);
    }

    function clearAuthentication() {
        token.value = null;
        currentUser.value = null;
        borrowHistory.value = null;
        localStorage.removeItem("user_token");
    }

    function addBorrow(borrow: BorrowDTO) {
        if (!borrowHistory.value) {
            return;
        }

        borrowHistory.value.content.unshift(borrow);
        borrowHistory.value.totalElements++;
        borrowHistory.value.numberOfElements++;
    }

    function createEmptyBorrowHistory(): RecordResponse {
        return {
            content: [],
            pageable: {
                pageNumber: 0,
                offset: 0,
                pageSize: 5,
                paged: true,
                unpaged: false,
                sort: {
                    sorted: false,
                    unsorted: true,
                    empty: true
                }
            },
            sort: {
                sorted: false,
                unsorted: true,
                empty: true
            },
            totalPages: 0,
            totalElements: 0,
            size: 5,
            number: 0,
            first: true,
            last: true,
            numberOfElements: 0,
            empty: true
        };
    }


    return {
        signIn,
        logout,
        currentUser,
        isAuthenticated,
        isLoading,
        token,
        addBorrow,
        authError,
        returnBorrow,
        borrowHistory,
        hasUnreturnedBorrows,
        recordsLoading,
        hasBorrowedOrReturnedToday,
        validationErrors,
        register
    };

});