import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UtilService } from 'src/app/services/util.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = new User();
  constructor(private router: Router,
    private util: UtilService,
    private toast:ToastService) { }

  ngOnInit() {
  }

  login() {
    if (this.util.isNull(this.user.phonenumber)||this.user.phonenumber.length!=11) {
      this.toast.presentToast('请填写正确的手机号');
      return;
    }

    localStorage.setItem('isLogin', new Date().getTime().toString());
    setTimeout(() => {
      console.log('login');
      this.router.navigate(['/tabs/home']);

    }, 1000);

  }
}
