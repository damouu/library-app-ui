import type {BorrowResponseDTO} from "@/types/borrow/BorrowResponseDTO";
import type {BorrowDTO} from "@/types/records/BorrowDTO";
import type {CartItem} from "@/types/cart/CartItem";

export function mapBorrowTransaction(
    response: BorrowResponseDTO,
    items: CartItem[]
): BorrowDTO {

    return {
        borrowUuid: response.borrow_uuid,
        borrowStartDate: response.borrowStartDate,
        borrowEndDate: response.borrowEndDate,
        borrowReturnDate: null,
        returnLately: null,
        daysLate: null,
        lateFee: null,
        chapters: items.map(item => ({
            chapterUuid: item.chapter.uuid,
            seriesUuid: "",
            title: item.chapter.title,
            secondTitle: item.chapter.secondTitle,
            chapterNumber: item.chapter.chapterNumber,
            coverArtworkUrl: item.chapter.coverArtworkUrl,
            publicationDate: ""
        }))
    };
}