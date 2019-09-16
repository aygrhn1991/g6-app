import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserInfo } from 'src/app/models/user.model';
import { UtilService } from 'src/app/services/util.service';
import { ToastService } from 'src/app/services/toast.service';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';
import { Result } from 'src/app/models/result.model';
import { VehInfo } from 'src/app/models/veh.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userInfo: UserInfo = new UserInfo();
  _phone: string = null;
  _code: number = null;
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
    if (this.util.isNull(this.userInfo.phone) || this.userInfo.phone.length != 11) {
      this.toast.show('请填写正确的手机号');
      return;
    }
    this._phone = this.userInfo.phone;
    this._code = this.util.getIntRandom(1000, 10000);
    this.http.sendPhoneCode(this._phone, this._code).subscribe(d => {
      this.toast.show('验证码发送成功');
      this.seconds = 5;
      this.counter();
    })
  }
  login() {
    if (this.util.isNull(this.userInfo.phone) || this.userInfo.phone.length != 11) {
      this.toast.show('请填写正确的手机号');
      return;
    }
    if (this.util.isNull(this.userInfo.code) || this.userInfo.code.toString().length != 4) {
      this.toast.show('请填写正确的验证码');
      return;
    }
    if (this._phone == this.userInfo.phone && this._code == this.userInfo.code) {
      this.http.login(this.userInfo.phone).subscribe((d: Result) => {
        this.toast.show(d.message);
        if (d.success) {
          this.http.getUserInfo(this.userInfo.phone).subscribe((d: Result) => {
            if (d.success) {
              this.userService.user.info = new UserInfo();
              this.userService.user.info.id = d.data.C_ID;
              this.userService.user.info.phone = d.data.C_PHONE;
              this.userService.user.info.name = d.data.C_NAME;
              this.userService.updateUser();
              this.http.getBindVins(this.userService.user.info.id).subscribe((d: Result) => {
                if (d.success) {
                  this.userService.user.vins = d.data.map(x => {
                    let veh = new VehInfo();
                    veh.id = x.C_ID;
                    veh.vin = x.C_VIN;
                    veh.vehno = x.C_VEHNO;
                    return veh;
                  })
                  this.userService.user.vin = d.data.length != 0 ? this.userService.user.vins[0] : new VehInfo();
                  this.userService.updateUser();
                  this.router.navigate(['/tabs/home']);
                }
              })
            }
          });
        }
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
