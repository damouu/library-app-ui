import type {BorrowSelection} from "@/types/borrow/BorrowSelection";
import type {BorrowRequestDTO} from "@/types/borrow/BorrowRequestDTO";

export function mapBorrowRequest(selections: BorrowSelection[]): BorrowRequestDTO {
    return {
        data: selections.map(selection => ({
            book_uuid: selection.bookUuid,
            chapter_uuid: selection.chapterUuid,
        }))
    };
}