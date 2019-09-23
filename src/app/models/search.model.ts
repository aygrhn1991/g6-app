import { UtilService } from 'src/app/services/util.service';
export class SearchModel {
    dateFormat: string = null;
    minDate: string = null;
    maxDate: string = null;
    dateStart: string = null;
    dateEnd: string = null;
    constructor() {
        let util = new UtilService();
        this.dateFormat = 'YYYY-MM-DD';
        this.minDate = '2019-01-01';
        this.maxDate = util.dateToYYMMDD(new Date());
        this.dateStart = util.dateToYYMMDD(util.addDay(new Date(), -7));
        this.dateEnd = util.dateToYYMMDD(new Date());
    }
}