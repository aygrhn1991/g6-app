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
      if(d.success){
        setTimeout(() => {
          var map = new BMap.Map(this.mapElement.nativeElement);
          var point = new BMap.Point(116.3512761582, 39.9154689363);
          map.centerAndZoom(point, 17);
          var marker = new BMap.Marker(point);
          map.addOverlay(marker);
        }, 500);
      }
    })



    

  }

}
