import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomType } from '../enums/custom-type.enum';

@Injectable()
export class HttpService {

    constructor(@Inject('API_URL') private apiUrl, private http: HttpClient) { }

    sendPhoneCode(phone: string, code: number) {
        return this.http.get(this.apiUrl + '/g6/auth/sendPhoneCode/' + phone + '/' + code);
    }
    register(phone: string) {
        return this.http.get(this.apiUrl + '/g6/auth/register/' + phone);
    }
    login(phone: string) {
        return this.http.get(this.apiUrl + '/g6/auth/login/' + phone);
    }
    getUserInfo(phone: string) {
        return this.http.get(this.apiUrl + '/g6/auth/getUserInfo/' + phone);
    }
    getBindVins(uid: number) {
        return this.http.get(this.apiUrl + '/g6/auth/getBindVins/' + uid);
    }
    bindVin(uid: number, vin: string) {
        return this.http.get(this.apiUrl + '/g6/auth/bindVin/' + uid + '/' + vin);
    }
    unBindVin(uid: number, vid: number) {
        return this.http.get(this.apiUrl + '/g6/auth/unBindVin/' + uid + '/' + vid);
    }
    updateUserInfo(uid: number, name: string) {
        return this.http.get(this.apiUrl + '/g6/auth/updateUserInfo/' + uid + '/' + name);
    }
    getVeh(vid: number) {
        return this.http.get(this.apiUrl + '/g6/home/getVeh/' + vid);
    }
    getCustomData(vid: number, type: CustomType, dateStart: number, dateEnd: number) {
        return this.http.get(this.apiUrl + '/g6/home/getCustomData/' + vid + '/' + type + '/' + dateStart + '/' + dateEnd);
    }
    getLocationData(vid: number) {
        return this.http.get('../../assets/points.json');
        //return this.http.get(this.apiUrl + '/g6/home/getLocationData/' + vid);
    }
    getTrackerData(vid: number, dateStart: number, dateEnd: number) {
        return this.http.get('../../assets/points.json');
        //return this.http.get(this.apiUrl + '/g6/home/getTrackerData/' + vid + '/' + dateStart + '/' + dateEnd);
    }
    //↓↓↓↓↓尚未使用↓↓↓↓↓
    getDownloadUrl() {
        return 'http://www.fenglingtime.com/api/update.apk';
    }

}
