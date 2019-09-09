import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { ToastService } from 'src/app/services/toast.service';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User = new User();
  _phonenumber: string = null;
  _phonecode: number = null;
  seconds: number = 0;
  secondsMsg: string = '';
  constructor(private router: Router,
    private util: UtilService,
    private toast: ToastService,
    private http: HttpService) { }

  ngOnInit() {
  }

  getPhoneCode() {
    if (this.util.isNull(this.user.phonenumber) || this.user.phonenumber.length != 11) {
      this.toast.presentToast('请填写正确的手机号');
      return;
    }
    this._phonenumber = this.user.phonenumber;
    this._phonecode = this.util.getIntRandom(1000, 10000);
    this.http.sendPhoneCode(this._phonecode).subscribe((d) => {
      console.log('验证码发送成功');
      console.log(this._phonecode);
      this.seconds = 5;
      this.counter();
    })
  }
  register() {
    if (this.util.isNull(this.user.phonenumber) || this.user.phonenumber.length != 11) {
      this.toast.presentToast('请填写正确的手机号');
      return;
    }
    if (this.util.isNull(this.user.phonecode) || this.user.phonecode.toString().length != 4) {
      this.toast.presentToast('请填写正确的验证码');
      return;
    }
    if (this._phonenumber == this.user.phonenumber && this._phonecode == this.user.phonecode) {
      this.http.register().subscribe((d) => {
        this.toast.presentToast('注册成功');
        localStorage.setItem('isLogin', new Date().getTime().toString());
        this.router.navigate(['/tabs/user']);
      })
    } else {
      this.toast.presentToast('验证码错误');
    }
  }
  counter() {
    this.seconds--;
    if (this.seconds > 0) {
      this.secondsMsg = '(' + this.seconds + ')';
      setTimeout(() => {
        this.counter()
      }, 1000);
    } else {
      this.secondsMsg = '';
    }
  }

}
