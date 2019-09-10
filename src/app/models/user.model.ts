export class User {
    phonenumber: string;
    phonecode: number;
    vin: string;
    vins: Array<string>;
    info: UserInfo;
    constructor() {
        this.phonenumber = null;
        this.phonecode = null;
        this.vin = null;
        this.vins = [];
        this.info = new UserInfo();
    }
}
export class UserInfo {
    name: string;
    phone: string;
    address: string;
    constructor() {
        this.name = null;
        this.phone = null;
        this.address = null;
    }
}