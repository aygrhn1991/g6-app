import { Component, OnInit } from '@angular/core';
import { Veh } from 'src/app/models/veh.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  veh: Veh = new Veh();

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.getVeh().subscribe((d) => {
      this.veh = new Veh();
    })
  }

}
