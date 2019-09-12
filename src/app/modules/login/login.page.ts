import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, Account } from 'src/app/models/user.model';
import { UtilService } from 'src/app/services/util.service';
import { ToastService } from 'src/app/services/toast.service';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';
import { Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userAccount: Account = new Account();
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
    if (this.util.isNull(this.userAccount.phone) || this.userAccount.phone.length != 11) {
      this.toast.show('请填写正确的手机号');
      return;
    }
    this._phonenumber = this.userAccount.phone;
    this._phonecode = this.util.getIntRandom(1000, 10000);
    this.http.sendPhoneCode(this._phonenumber, this._phonecode).subscribe(d => {
      this.toast.show('验证码发送成功');
      this.seconds = 5;
      this.counter();
    })
  }
  login() {
    if (this.util.isNull(this.userAccount.phone) || this.userAccount.phone.length != 11) {
      this.toast.show('请填写正确的手机号');
      return;
    }
    if (this.util.isNull(this.userAccount.code) || this.userAccount.code.toString().length != 4) {
      this.toast.show('请填写正确的验证码');
      return;
    }
    if (this._phonenumber == this.userAccount.phone && this._phonecode == this.userAccount.code) {
      this.http.login(this.userAccount.phone).subscribe((d: Result) => {
        this.toast.show(d.message);
        if (d.success) {
          this.http.getBindVins(this.userAccount.phone).subscribe((d: Result) => {
            if (d.success) {
              if (d.data.length != 0) {
                this.userService.user.vin = d.data.map(x => {
                  return { aaa: x.c_id, bbb: x.c_vin };
                })
              }
            }

            // this.http.getUserInfo().subscribe((d: any) => {
            //   this.userModel.info.name = 'aaa';
            //   this.userModel.info.phone = 'bbb';
            //   this.userModel.info.address = 'ccc';
            //   this.userService.user = this.userModel;
            //   this.userService.updateUser();
            //   this.router.navigate(['/tabs/home']);
            // });
          })
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
