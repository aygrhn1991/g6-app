import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

    user: User = null;

    constructor() {
        let userObj = localStorage.getItem('user');
        if (userObj != null) {
            this.user = JSON.parse(userObj);
        } else {
            this.user = new User();
        }
    }

    updateUser() {
        localStorage.setItem('user', JSON.stringify(this.user));
    }


}
