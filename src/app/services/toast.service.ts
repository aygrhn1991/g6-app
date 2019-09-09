import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ToastService {

    constructor(private toastController: ToastController) { }

    async show(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000,
            color: 'dark',
            position: 'middle'
        });
        toast.present();
    }
}
