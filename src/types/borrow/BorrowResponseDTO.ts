import type {BorrowItemDTO} from "@/types/borrow/BorrowItemDTO";

export interface BorrowResponseDTO {
    borrow_uuid: string;
    memberCardUuid: string;
    borrowStartDate: string;
    borrowEndDate: string;
    books: BorrowItemDTO[];
}