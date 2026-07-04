import type {CartChapter} from "./CartChapter";

export interface CartItem {
    bookUuid: string;
    chapter: CartChapter;
}