export class Series {

    private _uuid: string;
    private _title: string;
    private _genre: string;
    private _coverArtworkUrl: string;
    private _illustrator: string;
    private _publisher: string;
    private _lastPrintPublicationDate: string;
    private _firstPrintPublicationDate: string;
    private _author: string;


    constructor(uuid: string, title: string, genre: string, coverArtworkUrl: string, illustrator: string, publisher: string, lastPrintPublicationDate: string, firstPrintPublicationDate: string, author: string) {
        this._uuid = uuid;
        this._title = title;
        this._genre = genre;
        this._coverArtworkUrl = coverArtworkUrl;
        this._illustrator = illustrator;
        this._publisher = publisher;
        this._lastPrintPublicationDate = lastPrintPublicationDate;
        this._firstPrintPublicationDate = firstPrintPublicationDate;
        this._author = author;
    }


    get author(): string {
        return this._author;
    }

    set author(value: string) {
        this._author = value;
    }

    get uuid(): string {
        return this._uuid;
    }

    set uuid(value: string) {
        this._uuid = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get genre(): string {
        return this._genre;
    }

    set genre(value: string) {
        this._genre = value;
    }

    get coverArtworkUrl(): string {
        return this._coverArtworkUrl;
    }

    set coverArtworkUrl(value: string) {
        this._coverArtworkUrl = value;
    }

    get illustrator(): string {
        return this._illustrator;
    }

    set illustrator(value: string) {
        this._illustrator = value;
    }

    get publisher(): string {
        return this._publisher;
    }

    set publisher(value: string) {
        this._publisher = value;
    }

    get lastPrintPublicationDate(): string {
        return this._lastPrintPublicationDate;
    }

    set lastPrintPublicationDate(value: string) {
        this._lastPrintPublicationDate = value;
    }

    get firstPrintPublicationDate(): string {
        return this._firstPrintPublicationDate;
    }

    set firstPrintPublicationDate(value: string) {
        this._firstPrintPublicationDate = value;
    }
}
