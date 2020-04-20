import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';
import { ChartService } from 'src/app/services/chart.service';
import { Result } from 'src/app/models/result.model';
import { SearchModel } from 'src/app/models/search.model';
import { Speed, SpeedType } from 'src/app/enums/speed-type.enum';
import { LocationType } from 'src/app/enums/custom-type.enum';
declare var BMap: any;
declare var BMapLib: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  pageModel = {
    speed: Speed.speed1,
    progress: 0,
  }
  locationType = LocationType;
  locationSelected = LocationType.track;
  searchModel: SearchModel = new SearchModel();
  map: any;
  lushu: any;
  points: Array<any>;
  speedType = SpeedType;
  @ViewChild('mapElement', null) mapElement: ElementRef;

  constructor(private util: UtilService,
    private router: Router,
    private toast: ToastService,
    private http: HttpService,
    private userService: UserService,
    private route: ActivatedRoute,
    private chartService: ChartService) { }

  ngOnInit() {
    //this.search1();
  }

  search1() {
    this.locationSelected = LocationType.location;
    this.http.getLocationData(this.userService.user.vin.id).subscribe((d: Result) => {
      console.log('location----->', d);
      //if (d.success) {
      if (!d.success) {
        //let oldPoint = new BMap.Point(d.data.C_LNG, d.data.C_LAT);
        let oldPoint = new BMap.Point(112.729055, 36.685573);
        let convertor = new BMap.Convertor();
        convertor.translate([oldPoint], 1, 5, (dd) => {
          console.log('百度官方坐标转换----->', dd);
          if (dd.status === 0) {
            let newPoint = dd.points[0];
            this.map = new BMap.Map(this.mapElement.nativeElement);
            this.map.centerAndZoom(newPoint, 15);
            let mapStyle = { style: 'midnight' };
            this.map.setMapStyle(mapStyle);
            let marker = new BMap.Marker(newPoint);
            this.map.addOverlay(marker);
          }
        })
      }
    })
  }
  search2() {
    this.http.getTrackerData(this.userService.user.vin.id,
      this.util.getDayStart(new Date(this.searchModel.dateStart)).getTime(),
      this.util.getDayEnd(new Date(this.searchModel.dateEnd)).getTime()).subscribe((d: any) => {
        console.log('track----->', d);
        this.points = JSON.parse(d.data).data.map(x => {
          return new BMap.Point(x.x, x.y);
        }).slice(0, 2000);
        ///////////////////////////////
        this.map = new BMap.Map(this.mapElement.nativeElement);
        this.map.centerAndZoom(this.points[0], 19);
        let mapStyle = { style: 'midnight' };
        this.map.setMapStyle(mapStyle);
        this.map.addOverlay(new BMap.Polyline(this.points, { strokeColor: '#ff0000' }));
        this.map.setViewport(this.points);
        ///////////////////////////////
        let lushuOption = {
          defaultContent: this.userService.user.vin.vin,
          autoView: true,
          icon: new BMap.Icon('../../assets/img/marker.png', new BMap.Size(30, 50), { anchor: new BMap.Size(15, 50) }),
          speed: this.pageModel.speed,
          enableRotation: false,
          landmarkPois: []//传空数组，不可以不写，会报错
        };
        this.lushu = new BMapLib.LuShu(this.map, this.points, lushuOption);
      })
  }
  start() {
    this.lushu.start();
    let timer = setInterval(() => {
      let lushuIndex = this.lushu.i;
      let pointsCount = this.points.length;
      this.pageModel.progress = lushuIndex / pointsCount;
      console.log((lushuIndex / pointsCount).toFixed(2));
      if (lushuIndex == (pointsCount - 1)) {
        this.pageModel.progress = 1;
        clearInterval(timer);
        console.log('stop timer', timer);
      }
    }, 200);
    console.log('start timer', timer);
  }
  stop() {
    this.lushu.stop();
  }
  pause() {
    this.lushu.pause();
  }
  speed(type: SpeedType) {
    switch (this.lushu._opts.speed) {
      case Speed.speed0125:
        this.pageModel.speed = type == SpeedType.up ? Speed.speed025 : Speed.speed0125;
        break;
      case Speed.speed025:
        this.pageModel.speed = type == SpeedType.up ? Speed.speed05 : Speed.speed0125;
        break;
      case Speed.speed05:
        this.pageModel.speed = type == SpeedType.up ? Speed.speed1 : Speed.speed025;
        break;
      case Speed.speed1:
        this.pageModel.speed = type == SpeedType.up ? Speed.speed2 : Speed.speed05;
        break;
      case Speed.speed2:
        this.pageModel.speed = type == SpeedType.up ? Speed.speed4 : Speed.speed1;
        break;
      case Speed.speed4:
        this.pageModel.speed = type == SpeedType.up ? Speed.speed8 : Speed.speed2;
        break;
      case Speed.speed8:
        this.pageModel.speed = type == SpeedType.up ? Speed.speed8 : Speed.speed4;
        break;
      default:
        break;
    }
    this.lushu._opts.speed = this.pageModel.speed;
  }
  //此方法暂时用不到
  pointsTransfer(points: Array<any>) {
    let interval = 10;//取点数量
    if (points.length <= interval) {
      return points;
    }
    let intervalSize = Math.floor(points.length / (interval - 1));
    let oldPoints = [];
    for (let i = 0; i < interval; i++) {
      oldPoints.push(points[i * intervalSize]);
    }
    let convertor = new BMap.Convertor();
    let newPoints: Array<any> = [];
    convertor.translate(oldPoints, 1, 5, (dd) => {
      console.log('百度官方坐标转换----->', dd);
      if (dd.status === 0) {
        newPoints = dd.points;
      }
    });
    return newPoints;
  }
}
