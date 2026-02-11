export class User {

    private _card_uuid: string;
    private _name: string;
    private _email: string;
    private _avatar_img_url: string;
    private _last_logged_in_at: string;

    constructor(cardUuid: string, name: string, email: string, avatarImgUrl: string, lastLoggedInAt: string) {
        this._card_uuid = cardUuid;
        this._name = name;
        this._email = email;
        this._avatar_img_url = avatarImgUrl;
        this._last_logged_in_at = lastLoggedInAt;
    }


    get card_uuid(): string {
        return this._card_uuid;
    }

    set card_uuid(value: string) {
        this._card_uuid = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get avatar_img_url(): string {
        return this._avatar_img_url;
    }

    set avatar_img_url(value: string) {
        this._avatar_img_url = value;
    }

    get last_logged_in_at(): string {
        return this._last_logged_in_at;
    }

    set last_logged_in_at(value: string) {
        this._last_logged_in_at = value;
    }
}
