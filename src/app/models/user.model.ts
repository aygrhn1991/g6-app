export class User {
    phonenumber: string;
    phonecode: number;
    vin: string;
    vins: Array<string>;
    info: Info;
    constructor() {
        this.phonenumber = null;
        this.phonecode = null;
        this.vin = null;
        this.vins = [];
        this.info = new Info();
    }
}
export class Info {
    name: string;
    phone: string;
    address: string;
    constructor() {
        this.name = null;
        this.phone = null;
        this.address = null;
    }
}