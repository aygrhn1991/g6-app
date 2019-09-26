import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';
import { ChartService } from 'src/app/services/chart.service';
import { Result } from 'src/app/models/result.model';
declare var BMap: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  @ViewChild('mapElement', null) mapElement: ElementRef;

  constructor(private util: UtilService,
    private router: Router,
    private toast: ToastService,
    private http: HttpService,
    private userService: UserService,
    private route: ActivatedRoute,
    private chartService: ChartService) { }

  ngOnInit() {
    this.http.getLocationData(this.userService.user.vin.id).subscribe((d: Result) => {
      console.log(d);
      if (d.success) {
        let oldPoint = new BMap.Point(d.data.C_LNG, d.data.C_LAT);
        let convertor = new BMap.Convertor();
        convertor.translate([oldPoint], 1, 5, (dd) => {
          console.log(dd);
          if (dd.status === 0) {
            let newPoint = dd.points[0];
            let map = new BMap.Map(this.mapElement.nativeElement);
            map.centerAndZoom(newPoint, 15);
            var marker = new BMap.Marker(newPoint);
            map.addOverlay(marker);
          }
        })
      }
    })
  }

}
