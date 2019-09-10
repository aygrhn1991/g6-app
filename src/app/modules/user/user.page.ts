import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { ToastService } from 'src/app/services/toast.service';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

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
  unBindVin(){
    this.http.unBindVin(this.userService.user.vin).subscribe((d: Array<any>) => {
      if (d.length != 0) {
        Object.assign(this.userService.user, { vin: d[0], vins: d });
      } else {
        Object.assign(this.userService.user, { vin: null, vins: [] });
      }
      this.userService.updateUser();
    })
  }
  bindVin(){
    this.http.bindVin(this.userService.user.vin,this.userService.user.phonenumber).subscribe((d: Array<any>) => {
      if (d.length != 0) {
        Object.assign(this.userService.user, { vin: d[0], vins: d });
      } else {
        Object.assign(this.userService.user, { vin: null, vins: [] });
      }
      this.userService.updateUser();
    })
  }
  async openVinList() {
    let vinList = this.userService.user.vins.map(x => {
      return {
        text: x,
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
