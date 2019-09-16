import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpService } from 'src/app/services/http.service';
import { Result } from 'src/app/models/result.model';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  constructor(private userService: UserService,
    private http: HttpService,
    private toast: ToastService) { }

  ngOnInit() {
  }

  save() {
    this.http.updateUserInfo(this.userService.user.info.id, this.userService.user.info.name).subscribe((d: Result) => {
      this.toast.show(d.message);
      if (d.success) {
        this.userService.updateUser();
      }
    });
  }

}
