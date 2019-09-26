import { VehInfo, Veh } from './veh.model';

export class User {
    vin: VehInfo;
    vins: Array<VehInfo>;
    info: UserInfo;
    constructor() {
        this.vin = new VehInfo();
        this.vins = new Array<VehInfo>();
        this.info = new UserInfo();
    }
}
export class UserInfo {
    id: number;
    name: string;
    phone: string;
    code: number;
    token: string;
    constructor() {
        this.id = null;
        this.name = null;
        this.phone = null;
        this.token = null;
    }
}