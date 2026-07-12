import {api} from "@/plugins/gateway";
import {mapUserJwt} from "@/mappers/UserJwtMapper";
import {decodeJwt} from "@/utils/Jwt";
import type {UserJwt} from "@/types/auth/UserJwt";

export class AuthService {

    static async signIn(email: string, password: string) {

        const base64Credentials = window.btoa(`${email}:${password}`);

        const response = await api.post("/auth/login", {}, {
            headers: {
                Authorization: `Basic ${base64Credentials}`
            }
        });

        const token = response.data.access_token;

        const payload = decodeJwt<UserJwt>(token);

        return {token, user: mapUserJwt(payload)};
    }


    static async signUp(user_name: string, email: string, password: string, password_confirmation: string) {

        const response = await api.post(`/auth/register`, {
            user_name, email, password, password_confirmation
        }, {});

        const token = response.data.access_token;

        const payload = decodeJwt<UserJwt>(token);

        return {token, user: mapUserJwt(payload)};

    }
}