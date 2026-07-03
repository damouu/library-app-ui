import type {BorrowDTO} from "@/types/records/BorrowDTO";
import {mapBorrowChapter} from "@/mappers/BorrowChapterMapper";

export function mapBorrow(dto: BorrowDTO): BorrowDTO {
    return {
        borrowUuid: dto.borrowUuid,
        borrowStartDate: dto.borrowStartDate,
        borrowEndDate: dto.borrowEndDate,
        borrowReturnDate: dto.borrowReturnDate,
        returnLately: dto.returnLately,
        daysLate: dto.daysLate,
        lateFee: dto.lateFee,
        chapters: dto.chapters.map(mapBorrowChapter)
    };
}