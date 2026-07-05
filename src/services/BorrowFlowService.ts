import {BorrowService} from "@/services/BorrowService";
import {mapBorrowTransaction} from "@/mappers/BorrowTransactionMapper";
import type {CartItem} from "@/types/cart/CartItem";
import type {BorrowSelection} from "@/types/borrow/BorrowSelection";

export class BorrowFlowService {

    static async borrow(items: CartItem[]) {
        const selections: BorrowSelection[] = items.map(item => ({
            bookUuid: item.bookUuid,
            chapterUuid: item.chapter.uuid
        }));

        const transaction = await BorrowService.borrow(selections);

        const borrow = mapBorrowTransaction(transaction, items);

        return {
            transaction,
            borrow
        };
    }
}