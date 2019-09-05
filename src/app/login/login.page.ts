import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  login() {
    
    localStorage.setItem('isLogin', new Date().getTime().toString());
    setTimeout(() => {
      console.log('login');
      this.router.navigate(['/tabs/home']);

    }, 1000);

  }
}
