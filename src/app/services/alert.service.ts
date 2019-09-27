import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }

  async show(message: string) {
    const alert = await this.alertController.create({
      header: '提示',
      message: message,
      buttons: ['确定']
    });
    await alert.present();
  }

}
