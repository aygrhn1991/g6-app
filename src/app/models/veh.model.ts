export class Veh {
    info: VehInfo;
    condition: VehCondition;
    statistic: VehStatistic;
    constructor() {
        this.info = new VehInfo();
        this.condition = new VehCondition();
        this.statistic = new VehStatistic();
    }
}
export class VehInfo {
    id: number;
    vin: string;
    vehno: string;
    color: string;
    bodycolor: string;
    vehmodel: string;
    dtucode: string;
    simcode: string;
    engcode: string;
    constructor() {
        this.id = null;
        this.vin = null;
        this.vehno = null;
        this.color = null;
        this.bodycolor = null;
        this.vehmodel = null;
        this.dtucode = null;
        this.simcode = null;
        this.engcode = null;
    }
}
export class VehCondition {
    fuel: number;
    reactant: number;
    constructor() {
        this.fuel = null;
        this.reactant = null;
    }
}
export class VehStatistic {
    duration: number;
    mileage: number;
    nox: number;
    consumption: number;
    faults: number;
    constructor() {
        this.duration = null;
        this.mileage = null;
        this.nox = null;
        this.consumption = null;
        this.faults = null;
    }
}