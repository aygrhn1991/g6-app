import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { AlertService } from 'src/app/services/alert.service';
import { AlertController } from '@ionic/angular';

import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { File } from '@ionic-native/file/ngx';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  list: Array<string>;

  constructor(private toast: ToastService,
    private alert: AlertService,
    private alertController: AlertController,
    private http: HttpService,
    private file: File,
    private fileTransfer: FileTransfer,
    private appVersion: AppVersion,
    private fileOpener: FileOpener) { }

  ngOnInit() { }

  checkUpdate() {
    this.list = [];
    this.appVersion.getAppName().then((value: any) => {
      this.list.unshift('当前app名称：' + value);
    }).catch(err => {
      this.list.unshift('app名称获取失败：' + err);
    });
    this.appVersion.getPackageName().then((value: any) => {
      this.list.unshift('当前app包名：' + value);
    }).catch(err => {
      this.list.unshift('app包名取失败：' + err);
    });
    this.appVersion.getVersionCode().then((value: any) => {
      this.list.unshift('当前app VersionCode：' + value);
    }).catch(err => {
      this.list.unshift('app VersionCode获取失败：' + err);
    });
    this.appVersion.getVersionNumber().then((value: any) => {
      this.list.unshift('当前app VersionNumber：' + value);
      this.updateConfirm('发现新版本，是否更新？');
    }).catch(err => {
      this.list.unshift('app VersionNumber获取失败：' + err);
    });
  }

  async updateConfirm(message: string) {
    const alert = await this.alertController.create({
      header: '提示!',
      message: message,
      buttons: [{
        text: '取消',
        role: 'cancel',
        handler: () => { }
      }, {
        text: '确定',
        handler: () => {
          this.startDownload();
        }
      }]
    });
    await alert.present();
  }

  startDownload() {
    let fileDataDirectory = this.file.dataDirectory;
    this.list.unshift('当前app安装目录：' + fileDataDirectory);

    let targetUrl = this.http.getDownloadUrl();
    this.list.unshift('更新文件url');

    let fileTransferObject: FileTransferObject = this.fileTransfer.create();
    fileTransferObject.download(targetUrl, fileDataDirectory + 'update.apk').then(
      (entry) => {
        this.fileOpener.open(entry.toURL(), 'application/vnd.android.package-archive')
          .then(() => {
            this.list.unshift('↓↓↓↓↓文件已打开');
          })
          .catch(err => {
            this.list.unshift('↓↓↓↓↓文件打开失败：' + err);
          });
      },
      (err) => {
        this.list.unshift('↓↓↓↓↓下载失败：' + JSON.stringify(err));
      });
    fileTransferObject.onProgress((event: ProgressEvent) => {
      let num = Math.ceil(event.loaded / event.total * 100);
      if (num === 100) {
        this.list.unshift('↓↓↓↓↓下载完成');
      } else {
        this.list.unshift('↓↓↓↓↓下载进度:' + num + '%');
      }
    });
  }
}
