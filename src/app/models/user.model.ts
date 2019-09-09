export class User {
    phonenumber: string;
    phonecode: number;
    vin: string;
    vins: Array<string>;
    constructor() {
        this.phonenumber = null;
        this.phonecode = null;
        this.vin = null;
        this.vins = [];
    }
}