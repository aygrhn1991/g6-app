import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { ToastService } from 'src/app/services/toast.service';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bind',
  templateUrl: './bind.page.html',
  styleUrls: ['./bind.page.scss'],
})
export class BindPage implements OnInit {

  vin: string = '';

  constructor(private router: Router,
    private util: UtilService,
    private toast: ToastService,
    private http: HttpService,
    private userService: UserService) { }

  ngOnInit() {
  }

  bind() {
    if (this.util.isNull(this.vin) || this.vin.length != 17) {
      this.toast.show('请填写正确的VIN');
      return;
    }
    this.http.bindVin(this.userService.user.phonenumber, this.vin).subscribe(d => {
      this.toast.show('车辆绑定成功');
      this.http.getBindVins(this.userService.user.phonenumber).subscribe((d: Array<any>) => {
        if (d.length != 0) {
          Object.assign(this.userService.user, { vin: d[0], vins: d });
        } else {
          Object.assign(this.userService.user, { vin: null, vins: [] });
        }
        this.userService.updateUser();
        this.router.navigate(['/tabs/user']);
      })
    })
  }


}
