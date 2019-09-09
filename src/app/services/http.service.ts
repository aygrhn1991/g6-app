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
}
