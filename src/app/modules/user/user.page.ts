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
    private user: UserService) { }

  ngOnInit() {
    this.getUserVins();
  }
  getUserVins() {
    this.http.getUserVins(this.user.user.phonenumber).subscribe((d: Array<any>) => {
      if (d.length != 0) {
        Object.assign(this.user.user, { vin: d[0], vins: d });
      } else {
        Object.assign(this.user.user, { vin: null, vins: [] });
      }
      this.user.updateUser();
    })
  }
  unBindVin(){
    this.http.unBindVin(this.user.user.vin).subscribe((d: Array<any>) => {
      if (d.length != 0) {
        Object.assign(this.user.user, { vin: d[0], vins: d });
      } else {
        Object.assign(this.user.user, { vin: null, vins: [] });
      }
      this.user.updateUser();
    })
  }
  async openVinList() {
    let vinList = this.user.user.vins.map(x => {
      return {
        text: x,
        handler: () => {
          this.user.user.vin = x;
          this.user.updateUser();
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
