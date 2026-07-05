import {AuthService} from "@/services/AuthService";

export class AuthFlowService {

    static async login(email: string, password: string) {
        return AuthService.signIn(email, password);
    }
}