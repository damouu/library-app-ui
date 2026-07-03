export class Inventory {

    private _bookUuID: string;
    private _chapterUuID: string;
    private _currentlyBorrowed: boolean;


    constructor(bookUuID: string, chapterUuID: string, currentlyBorrowed: boolean) {
        this._bookUuID = bookUuID;
        this._chapterUuID = chapterUuID;
        this._currentlyBorrowed = currentlyBorrowed;
    }


    get bookUuID(): string {
        return this._bookUuID;
    }

    set bookUuID(value: string) {
        this._bookUuID = value;
    }

    get chapterUuID(): string {
        return this._chapterUuID;
    }

    set chapterUuID(value: string) {
        this._chapterUuID = value;
    }

    get currentlyBorrowed(): boolean {
        return this._currentlyBorrowed;
    }

    set currentlyBorrowed(value: boolean) {
        this._currentlyBorrowed = value;
    }
}
