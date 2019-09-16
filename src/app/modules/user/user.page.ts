import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { ToastService } from 'src/app/services/toast.service';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';
import { Result } from 'src/app/models/result.model';
import { VehInfo } from 'src/app/models/veh.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(public actionSheetController: ActionSheetController,
    private router: Router,
    private util: UtilService,
    private toast: ToastService,
    private http: HttpService,
    private userService: UserService) { }

  ngOnInit() {
  }

  unBindVin() {
    this.http.unBindVin(this.userService.user.info.id, this.userService.user.vin.id).subscribe((d: Result) => {
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
          }
        })
      }
    })
  }

  async openVinList() {
    let vinList = this.userService.user.vins.map(x => {
      return {
        text: x.vin,
        handler: () => {
          this.userService.user.vin = x;
          this.userService.updateUser();
        }
      }
    });
    const actionSheet = await this.actionSheetController.create({
      header: '切换绑定VIN',
      buttons: vinList
    });
    await actionSheet.present();
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
