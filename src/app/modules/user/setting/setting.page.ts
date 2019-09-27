import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { AlertService } from 'src/app/services/alert.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  list: Array<string>;

  constructor(private toast: ToastService,
    private appVersion: AppVersion,
    private alert: AlertService,
    private alertController: AlertController) { }

  ngOnInit() { }

  checkUpdate() {
    this.list = [];
    this.appVersion.getAppName().then((value: any) => {
      this.list.push('当前app名称：' + value);
    }).catch(err => {
      this.list.push('app名称获取失败：' + err);
    });
    this.appVersion.getPackageName().then((value: any) => {
      this.list.push('当前app包名：' + value);
    }).catch(err => {
      this.list.push('app包名取失败：' + err);
    });
    this.appVersion.getVersionCode().then((value: any) => {
      this.list.push('当前app VersionCode：' + value);
    }).catch(err => {
      this.list.push('app VersionCode获取失败：' + err);
    });
    this.appVersion.getVersionNumber().then((value: any) => {
      this.list.push('当前app VersionNumber：' + value);
    }).catch(err => {
      this.list.push('app VersionNumber：获取失败：' + err);
    });
  }

  async confirm(message: string) {
    const alert = await this.alertController.create({
      header: '提示!',
      message: message,
      buttons: [{
        text: '确定',
        handler: () => {
          console.log('点击 确定');
        }
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log('点击 取消');
        }
      }]
    });
    await alert.present();
  }
}
