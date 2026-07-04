import {AuthService} from "@/services/AuthService";
import {RecordService} from "@/services/RecordService";

export class AuthFlowService {

    static async login(email: string, password: string) {

        const {user, token} = await AuthService.signIn(email, password);

        const records = await RecordService.getRecords(0, 5, token);

        return {
            user,
            token,
            records
        };
    }
}