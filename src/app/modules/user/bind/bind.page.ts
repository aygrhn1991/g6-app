import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { ToastService } from 'src/app/services/toast.service';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';
import { Result } from 'src/app/models/result.model';
import { VehInfo } from 'src/app/models/veh.model';

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
    if (this.userService.user.vins.length >= 3) {
      this.toast.show('一个账号最多可以绑定3个VIN');
      return;
    }
    if (this.util.isNull(this.vin) || this.vin.length != 17) {
      this.toast.show('请填写正确的VIN');
      return;
    }
    this.http.bindVin(this.userService.user.info.id, this.vin).subscribe((d: Result) => {
      this.toast.show(d.message);
      if (d.success) {
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
            this.router.navigate(['/tabs/user']);
          }
        })
      }
    })
  }


}
