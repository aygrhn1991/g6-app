import { VehInfo, Veh } from './veh.model';

export class User {
    account: Account;
    vin: VehInfo;
    vins: Array<VehInfo>;
    info: UserInfo;
    constructor() {
        this.account = new Account();
        this.vin = new VehInfo();
        this.vins = new Array<VehInfo>();
        this.info = new UserInfo();
    }
}
export class Account {
    phone: string;
    code: number;
    constructor() {
        this.phone = null;
        this.code = null;
    }
}
export class UserInfo {
    id: number;
    name: string;
    phone: string;
    constructor() {
        this.id = null;
        this.name = null;
        this.phone = null;
    }
}