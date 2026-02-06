export class Comment {

    private _chapterUuid: string;
    private _commentUuid: number;
    private _content: string;
    private _deletedAt: string | null = null;
    private _createdAt: string;
    private _updatedAt: string;
    private _userName: string;
    private _avatar_URL: string;


    constructor(chapterUuid: string, commentUuid: number, content: string, deletedAt: string | null, createdAt: string, updatedAt: string, userName: string, avatar_URL: string) {
        this._chapterUuid = chapterUuid;
        this._commentUuid = commentUuid;
        this._content = content;
        this._deletedAt = deletedAt;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
        this._userName = userName;
        this._avatar_URL = avatar_URL;
    }


    get chapterUuid(): string {
        return this._chapterUuid;
    }

    set chapterUuid(value: string) {
        this._chapterUuid = value;
    }

    get commentUuid(): number {
        return this._commentUuid;
    }

    set commentUuid(value: number) {
        this._commentUuid = value;
    }

    get content(): string {
        return this._content;
    }

    set content(value: string) {
        this._content = value;
    }

    get deletedAt(): string | null {
        return this._deletedAt;
    }

    set deletedAt(value: string | null) {
        this._deletedAt = value;
    }

    get createdAt(): string {
        return this._createdAt;
    }

    set createdAt(value: string) {
        this._createdAt = value;
    }

    get updatedAt(): string {
        return this._updatedAt;
    }

    set updatedAt(value: string) {
        this._updatedAt = value;
    }

    get userName(): string {
        return this._userName;
    }

    set userName(value: string) {
        this._userName = value;
    }

    get avatar_URL(): string {
        return this._avatar_URL;
    }

    set avatar_URL(value: string) {
        this._avatar_URL = value;
    }
}
