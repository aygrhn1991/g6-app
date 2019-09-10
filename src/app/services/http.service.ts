import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

    constructor(@Inject('API_URL') private apiUrl,
        private http: HttpClient) { }    

    sendPhoneCode(code: number) {
        return this.http.get(this.apiUrl + '/api/result.json');
    }
    register() {
        return this.http.get(this.apiUrl + '/api/result.json');
    }
    login(){
        return this.http.get(this.apiUrl + '/api/result.json');
    }
    getUserVins(phonenumber:string){
        return this.http.get(this.apiUrl + '/api/list_string.json');
    }
    unBindVin(vin:string){
        return this.http.get(this.apiUrl + '/api/list_null.json');
    }
    bindVin(phonenumber:string, vin:string){
        return this.http.get(this.apiUrl + '/api/result.json');
    }
    getUserInfo(){
        return this.http.get(this.apiUrl + '/api/result.json');
    }
    updateUserInfo(){
        return this.http.get(this.apiUrl + '/api/result.json');
    }
    getVeh(){
        return this.http.get(this.apiUrl + '/api/result.json');
    }
}
