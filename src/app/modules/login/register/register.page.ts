import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { ToastService } from 'src/app/services/toast.service';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';
import { Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

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

  sendPhoneCode() {
    if (this.util.isNull(this.userModel.phonenumber) || this.userModel.phonenumber.length != 11) {
      this.toast.show('请填写正确的手机号');
      return;
    }
    this._phonenumber = this.userModel.phonenumber;
    this._phonecode = this.util.getIntRandom(1000, 10000);
    this.http.sendPhoneCode(this._phonenumber, this._phonecode).subscribe((d: Result) => {
      this.toast.show(d.message);
      if (d.success) {
        this.seconds = 5;
        this.counter();
      }
    })
  }
  register() {
    if (this.util.isNull(this.userModel.phonenumber) || this.userModel.phonenumber.length != 11) {
      this.toast.show('请填写正确的手机号');
      return;
    }
    if (this.util.isNull(this.userModel.phonecode) || this.userModel.phonecode.toString().length != 4) {
      this.toast.show('请填写正确的验证码');
      return;
    }
    if (this._phonenumber == this.userModel.phonenumber && this._phonecode == this.userModel.phonecode) {
      this.http.register(this.userModel.phonenumber).subscribe((d: Result) => {
        this.toast.show(d.message);
        if (d.success) {
          this.userService.user = this.userModel;
          this.userService.updateUser();
          this.router.navigate(['/tabs/user']);
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
