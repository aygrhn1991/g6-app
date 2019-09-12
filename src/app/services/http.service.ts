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
    getUserVins(phonenumber: string) {
        return this.http.get(this.apiUrl + '/api/list_string.json');
    }
    unBindVin(vin: string) {
        return this.http.get(this.apiUrl + '/api/list_null.json');
    }
    bindVin(phonenumber: string, vin: string) {
        return this.http.get(this.apiUrl + '/api/result.json');
    }
    getUserInfo() {
        return this.http.get(this.apiUrl + '/api/result.json');
    }
    updateUserInfo() {
        return this.http.get(this.apiUrl + '/api/result.json');
    }
    getVeh() {
        return this.http.get(this.apiUrl + '/api/result.json');
    }
    getCustomData(url: string) {
        return this.http.get(this.apiUrl + url);
    }
}
