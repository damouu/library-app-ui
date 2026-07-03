export class Book {

    private _uuid: string;
    private _totalPages: number;
    private _title: string;
    private _publisher: string;
    private _genre: string;
    private _created_at: string;
    private _author: string;
    private _studentIdCard: string | null;

    constructor(uuid: string, totalPages: number, title: string, publisher: string, genre: string, created_at: string, author: string, studentIdCard: string) {
        this._uuid = uuid;
        this._totalPages = totalPages;
        this._title = title;
        this._publisher = publisher;
        this._genre = genre;
        this._created_at = created_at;
        this._author = author;
        this._studentIdCard = studentIdCard;
    }

    get uuid(): string {
        return this._uuid;
    }

    set uuid(value: string) {
        this._uuid = value;
    }

    get totalPages(): number {
        return this._totalPages;
    }

    set totalPages(value: number) {
        this._totalPages = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get publisher(): string {
        return this._publisher;
    }

    set publisher(value: string) {
        this._publisher = value;
    }

    get genre(): string {
        return this._genre;
    }

    set genre(value: string) {
        this._genre = value;
    }

    get created_at(): string {
        return this._created_at;
    }

    set created_at(value: string) {
        this._created_at = value;
    }

    get author(): string {
        return this._author;
    }

    set author(value: string) {
        this._author = value;
    }

    get studentIdCard(): string {
        return <string>this._studentIdCard;
    }

    set studentIdCard(value: string) {
        this._studentIdCard = value;
    }

}
