import type {BorrowChapterDTO} from "@/types/chapter/BorrowChapterDTO";

export interface BorrowDTO {
    borrowUuid: string;
    borrowStartDate: string;
    borrowEndDate: string;
    borrowReturnDate: string | null;
    daysLate: number | null;
    lateFee: number | null;
    returnLately: boolean | null;
    chapters: BorrowChapterDTO[];
}