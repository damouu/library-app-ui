import {computed, ref} from "vue";
import {defineStore} from "pinia";
import {User} from "@/models/User";
import {AuthFlowService} from "@/services/AuthFlowService";
import {AuthService} from "@/services/AuthService";
import {mapValidationErrors} from "@/mappers/ValidationErrorMapper";

export const useUserStore = defineStore('user', () => {

    const currentUser = ref<User | null>(null);

    const authError = ref<string | null>(null);

    const token = ref<string | null>(localStorage.getItem('user_token'));

    const borrowHistory = ref<any>(null);

    const isAuthenticated = computed(() => currentUser.value !== null);

    const isLoading = ref(false);

    const recordsLoading = ref(false);

    const validationErrors = ref<Record<string, string[]>>({});

    const hasUnreturnedBorrows = computed(() => {
        return borrowHistory.value?.unreturned_borrows === true;
    });


    function logout() {
        clearAuthentication();
    }

    async function signIn(email: string, password: string) {
        isLoading.value = true;

        try {
            const {user, token: accessToken, records} = await AuthFlowService.login(email, password);

            authenticate(user, accessToken);
            borrowHistory.value = records;

        } catch (error) {
        } finally {
            isLoading.value = false;
        }
    }

    async function register(user_name: string, email: string, password: string, password_confirmation: string) {

        isLoading.value = true;
        authError.value = null;

        try {

            const {token: accessToken, user} = await AuthService.signUp(user_name, email, password, password_confirmation);

            authenticate(user, accessToken);

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


    return {
        signIn,
        logout,
        currentUser,
        isAuthenticated,
        isLoading,
        token,
        authError,
        borrowHistory,
        hasUnreturnedBorrows,
        recordsLoading,
        validationErrors,
        register
    };

});