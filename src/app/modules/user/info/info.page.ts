import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  constructor(private userService: UserService,
    private http: HttpService) { }

  ngOnInit() {
  }

  save() {
    this.http.updateUserInfo().subscribe((d) => {
      this.userService.updateUser();
    });
  }

}
