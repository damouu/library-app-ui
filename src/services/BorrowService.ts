import {api} from "@/plugins/gateway";
import {mapBorrowRequest} from "@/mappers/mapBorrowRequest";
import type {BorrowSelection} from "@/types/borrow/BorrowSelection";
import type {ReturnBorrowResponseDTO} from "@/types/borrow/ReturnBorrowResponseDTO";
import type {BorrowResponseDTO} from "@/types/borrow/BorrowResponseDTO";

export class BorrowService {

    static async borrow(selections: BorrowSelection[]): Promise<BorrowResponseDTO> {

        const payload = mapBorrowRequest(selections);

        const response = await api.post<BorrowResponseDTO>(
            "/borrow/books",
            payload
        );

        return response.data;
    }

    static async return(borrowUuid: string): Promise<ReturnBorrowResponseDTO> {

        const response = await api.post<ReturnBorrowResponseDTO>(
            `/borrow/${borrowUuid}/return`
        );

        return response.data;
    }
}