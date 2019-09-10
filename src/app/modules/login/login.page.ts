import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UtilService } from 'src/app/services/util.service';
import { ToastService } from 'src/app/services/toast.service';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userModel: User = new User();
  _phonenumber: string = null;
  _phonecode: number = null;
  seconds: number = 0;
  secondsMsg: string = '';

  constructor(private router: Router,
    private util: UtilService,
    private toast: ToastService,
    private http: HttpService,
    private userService: UserService) { }

  ngOnInit() {
  }

  getPhoneCode() {
    if (this.util.isNull(this.userModel.phonenumber) || this.userModel.phonenumber.length != 11) {
      this.toast.show('请填写正确的手机号');
      return;
    }
    this._phonenumber = this.userModel.phonenumber;
    this._phonecode = this.util.getIntRandom(1000, 10000);
    this.http.sendPhoneCode(this._phonecode).subscribe(d => {
      this.toast.show('验证码发送成功');
      this.seconds = 5;
      this.counter();
    })
  }
  login() {
    if (this.util.isNull(this.userModel.phonenumber) || this.userModel.phonenumber.length != 11) {
      this.toast.show('请填写正确的手机号');
      return;
    }
    if (this.util.isNull(this.userModel.phonecode) || this.userModel.phonecode.toString().length != 4) {
      this.toast.show('请填写正确的验证码');
      return;
    }
    if (this._phonenumber == this.userModel.phonenumber && this._phonecode == this.userModel.phonecode) {
      this.http.login().subscribe(d => {
        this.toast.show('登录成功');
        this.http.getUserVins(this.userModel.phonenumber).subscribe((d: Array<any>) => {
          if (d.length != 0) {
            Object.assign(this.userModel, { vin: d[0], vins: d });
          } else {
            Object.assign(this.userModel, { vin: null, vins: [] });
          }
          this.http.getUserInfo().subscribe((d: any) => {
            this.userModel.info.name = 'aaa';
            this.userModel.info.phone = 'bbb';
            this.userModel.info.address = 'ccc'; 
            this.userService.user = this.userModel;
            this.userService.updateUser();
            this.router.navigate(['/tabs/home']);
          });
        })
      })
    } else {
      this.toast.show('验证码错误');
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
