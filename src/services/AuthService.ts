import {api} from "@/plugins/gateway";
import {mapUser} from "@/mappers/UserMapper";
import {User} from "@/models/User";
import type {UserResponse} from "@/types/auth/UserResponse";

export class AuthService {

    static async signIn(email: string, password: string) {

        const base64Credentials = window.btoa(`${email}:${password}`);

        const response = await api.post(
            "/auth/login",
            {},
            {
                headers: {
                    Authorization: `Basic ${base64Credentials}`
                }
            }
        );

        return response.data.access_token;
    }

    static async signUp(user_name: string, email: string, password: string, password_confirmation: string) {

        const response = await api.post("/auth/register", {
            user_name,
            email,
            password,
            password_confirmation
        });

        return response.data.access_token;
    }

    static async getProfile(): Promise<User> {
        const response = await api.get<UserResponse>("/auth/profile");

        return mapUser(response.data);
    }
}