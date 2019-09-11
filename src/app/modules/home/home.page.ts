import { Component, OnInit } from '@angular/core';
import { Veh } from 'src/app/models/veh.model';
import { HttpService } from 'src/app/services/http.service';
import { CustomType } from 'src/app/enums/custom-type.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  veh: Veh = new Veh();
  customType: any = CustomType;

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.getVeh().subscribe((d) => {
      this.veh = new Veh();
    })
  }

}
