export class Chapter {

    private _uuid: string;
    private _title: string;
    private _secondTitle: string;
    private _publicationDate: string | null;
    private _coverArtworkUrl: string;
    private _totalPages: number | null;
    private _chapterNumber: number | null;
    private _seriesUuid: string | null;
    private _bookUuid: string | null;

    constructor(uuid: string, title: string, secondTitle: string, totalPages: number | null, chapterNumber: number, coverArtworkUrl: string, publicationDate: string | null, seriesUuid: string | null, bookUuid: string | null) {
        this._uuid = uuid;
        this._title = title;
        this._secondTitle = secondTitle;
        this._totalPages = totalPages;
        this._chapterNumber = chapterNumber;
        this._coverArtworkUrl = coverArtworkUrl;
        this._publicationDate = publicationDate;
        this._seriesUuid = seriesUuid;
        this._bookUuid = bookUuid;
    }

    get seriesUuid(): string | null {
        return this._seriesUuid;
    }

    set seriesUuid(value: string | null) {
        this._seriesUuid = value;
    }

    get bookUuid(): string | null {
        return this._bookUuid;
    }

    set bookUuid(value: string | null) {
        this._bookUuid = value;
    }

    get publicationDate(): string | null {
        return this._publicationDate;
    }

    set publicationDate(value: string) {
        this._publicationDate = value;
    }

    get secondTitle(): string {
        return this._secondTitle;
    }

    set secondTitle(value: string) {
        this._secondTitle = value;
    }

    get coverArtworkUrl(): string {
        return this._coverArtworkUrl;
    }

    set coverArtworkUrl(value: string) {
        this._coverArtworkUrl = value;
    }

    get totalPages(): number | null {
        return this._totalPages;
    }

    set totalPages(value: number | null) {
        this._totalPages = value;
    }

    get chapterNumber(): number | null {
        return this._chapterNumber;
    }

    set chapterNumber(value: number | null) {
        this._chapterNumber = value;
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


}
