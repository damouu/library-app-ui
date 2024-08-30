export class Student {
    private _uuid: string;
    private _name: string;
    private _email: string;
    private _dob: string;
    private _studentIdCard?: string;

    constructor(uuid: string, name: string, email: string, dob: string, studentIdCard: string) {
        this._uuid = uuid;
        this._name = name;
        this._email = email;
        this._dob = dob;
        this._studentIdCard = studentIdCard;
    }

    get uuid(): string {
        return this._uuid;
    }

    set uuid(value: string) {
        this._uuid = value;
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

    get dob(): string {
        return this._dob;
    }

    set dob(value: string) {
        this._dob = value;
    }


    get studentIdCard(): string {
        return this._studentIdCard;
    }

    set studentIdCard(value: string) {
        this._studentIdCard = value;
    }
}
