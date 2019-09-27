import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private toast: ToastService) { }

  ngOnInit() {
  }
  checkUpdate() {
    this.toast.show('尚未开放');
  }
}
