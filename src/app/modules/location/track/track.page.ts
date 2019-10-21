import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';
import { ToastService } from 'src/app/services/toast.service';
import { Result } from 'src/app/models/result.model';
import { SearchModel } from 'src/app/models/search.model';
import { SpeedType, Speed } from 'src/app/enums/speed-type.enum';
declare var BMap: any;
declare var BMapLib: any;

@Component({
  selector: 'app-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
})
export class TrackPage implements OnInit {
  pageModel = {
    speed: Speed.speed1,
    progress: 0,
  }
  searchModel: SearchModel = new SearchModel();
  lushu: any;
  points: Array<any>;
  speedType = SpeedType;

  @ViewChild('mapElement', null) mapElement: ElementRef;

  constructor(private util: UtilService,
    private http: HttpService,
    private userService: UserService,
    private toast: ToastService) { }

  ngOnInit() { }

  search() {
    this.http.getTrackerData(this.userService.user.vin.id,
      this.util.getDayStart(new Date(this.searchModel.dateStart)).getTime(),
      this.util.getDayEnd(new Date(this.searchModel.dateEnd)).getTime()).subscribe((d: any) => {
        console.log('track----->', d);
        this.points = d.map(x => {
          return new BMap.Point(x.x, x.y);
        }).slice(0, 500);
        ///////////////////////////////
        let map = new BMap.Map(this.mapElement.nativeElement);
        map.centerAndZoom(this.points[0], 19);
        map.addOverlay(new BMap.Polyline(this.points, { strokeColor: '#111' }));
        map.setViewport(this.points);
        ///////////////////////////////
        let lushuOption = {
          defaultContent: this.userService.user.vin.vin,
          autoView: true,
          icon: new BMap.Icon('../../assets/marker.png', new BMap.Size(30, 50), { anchor: new BMap.Size(15, 50) }),
          speed: this.pageModel.speed,
          enableRotation: false,
          landmarkPois: []//传空数组，不可以不写，会报错
        };
        this.lushu = new BMapLib.LuShu(map, this.points, lushuOption);
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
        this.pageModel.speed = type == SpeedType.up ? Speed.speed4 : Speed.speed2;
        break;
      case Speed.speed4:
        this.pageModel.speed = type == SpeedType.up ? Speed.speed4 : Speed.speed4;
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
