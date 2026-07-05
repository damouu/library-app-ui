import type {ReturnedItemDTO} from "@/types/borrow/ReturnedItemDTO";

export interface ReturnBorrowResponseDTO {
    borrowUuid: string;
    memberCardUuid: string;

    startDate: string;
    endDate: string;
    returnDate: string;

    isLate: boolean;
    daysLate: number;
    fineAmount: number;

    items: ReturnedItemDTO[];
}