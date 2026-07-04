import {api} from "@/plugins/gateway";
import type {BorrowSelection} from "@/types/borrow/BorrowSelection";
import {mapBorrowRequest} from "@/mappers/mapBorrowRequest";
import type {BorrowRequestDTO} from "@/types/borrow/BorrowRequestDTO";

export class BorrowService {

    static async borrow(selections: BorrowSelection[]): Promise<BorrowRequestDTO> {

        const payload = mapBorrowRequest(selections);

        const response = await api.post<BorrowRequestDTO>(
            "/api/borrow/books",
            payload
        );

        return response.data;
    }
}