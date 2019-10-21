import { Component, OnInit } from '@angular/core';
import { Veh, VehInfo, VehStatistic, VehCondition } from 'src/app/models/veh.model';
import { HttpService } from 'src/app/services/http.service';
import { CustomType, ModalType } from 'src/app/enums/custom-type.enum';
import { UserService } from 'src/app/services/user.service';
import { Result } from 'src/app/models/result.model';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  veh: Veh = new Veh();
  customType = CustomType;
  modalType = ModalType;
  modalSelected = this.modalType.basic;

  constructor(private http: HttpService,
    private toast: ToastService,
    private userService: UserService) { }

  ngOnInit() {
    this.http.getVeh(this.userService.user.vin.id).subscribe((d: Result) => {
      console.log('home----->', d);
      if (d.success) {
        let vehInfo = new VehInfo();
        vehInfo.id = d.data.info.C_ID;
        vehInfo.vin = d.data.info.C_VIN;
        vehInfo.vehno = d.data.info.C_VEHNO;
        vehInfo.color = d.data.info.C_COLOR;
        vehInfo.bodycolor = d.data.info.C_BCOLOR;
        vehInfo.vehmodel = d.data.info.C_VEHM;
        vehInfo.dtucode = d.data.info.C_DTUCODE;
        vehInfo.simcode = d.data.info.C_SIMCODE;
        vehInfo.engcode = d.data.info.C_ENGCODE;
        this.veh.info = vehInfo;
        let vehStatistic = new VehStatistic();
        vehStatistic.days = d.data.statistic.DAYS;
        vehStatistic.mile = d.data.statistic.MILE;
        vehStatistic.nox = d.data.statistic.NOX;
        vehStatistic.oil = d.data.statistic.OIL;
        vehStatistic.faults = d.data.statistic.FAULTS;
        this.veh.statistic = vehStatistic;
      }
    })
  }

}
