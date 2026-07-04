import {api} from "@/plugins/gateway";
import {mapRecords} from "@/mappers/RecordPageMapper";
import type {RecordResponse} from "@/types/records/RecordResponse";

export class RecordService {

    static async getRecords(page: number, size: number, token: string): Promise<RecordResponse> {
        const response = await api.get("/api/records", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {page, size}
        });
        return mapRecords(response.data);
    }
}