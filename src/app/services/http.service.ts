import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

    constructor(@Inject('API_URL') private apiUrl,
        private http: HttpClient) { }

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
    getBindVins(userid: number) {
        return this.http.get(this.apiUrl + '/g6/auth/getBindVins/' + userid);
    }
    bindVin(userid: number, vin: string) {
        return this.http.get(this.apiUrl + '/g6/auth/bindVin/' + userid + '/' + vin);
    }
    unBindVin(userid: number, vehid: number) {
        return this.http.get(this.apiUrl + '/g6/auth/unBindVin/' + userid + '/' + vehid);
    }
    updateUserInfo(userid: number, name: string) {
        return this.http.get(this.apiUrl + '/g6/auth/updateUserInfo/' + userid + '/' + name);
    }
    getVeh() {
        return this.http.get(this.apiUrl + '/api/result.json');
    }
    getCustomData(url: string) {
        return this.http.get(this.apiUrl + url);
    }
    getTrackPoints(){
        return this.http.get('../../assets/points2.json');
    }
}
