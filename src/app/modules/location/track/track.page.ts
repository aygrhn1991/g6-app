import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';
declare var BMap: any;
declare var BMapLib: any;

@Component({
  selector: 'app-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
})
export class TrackPage implements OnInit {

  @ViewChild('mapElement', null) mapElement: ElementRef;
  lushu: any;
  lushuOpt: any;
  points = [];
  constructor(private util: UtilService,
    private http: HttpService,
    private userService: UserService) { }
  ngOnInit() {
    this.http.getTrackerData(this.userService.user.vin.id,this.util.addDay(new Date(),-1000).getTime(),new Date().getTime()).subscribe(d=>{
      console.log(d);
    })
    this.http.getTrackPoints().subscribe((d: any) => {
      let tempP = [];
      for (let i = 0; i < 2000; i++) {
        if (i % 200 == 0) {
          tempP.push(d[i]);
        }
      }

      let _points = tempP.map(x => {
        //return new BMap.Point(x.lng, x.lat);
        return new BMap.Point(x.x, x.y);
      })


      var convertor = new BMap.Convertor();
      convertor.translate(_points, 1, 5, (data) => {
        console.log(data);
        if (data.status === 0) {
          this.points = data.points;
          this.makeLushu();
        }
      })

      console.log(this.points.length);

    })
  }


  makeLushu() {
    setTimeout(() => {
      var map = new BMap.Map(this.mapElement.nativeElement);
      map.centerAndZoom(this.points[0], 19);
      map.addOverlay(new BMap.Polyline(this.points, { strokeColor: '#111' }));
      map.setViewport(this.points);
      this.lushuOpt = {
        defaultContent: "从天安门到百度大厦",//"从天安门到百度大厦"
        autoView: true,//是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
        icon: new BMap.Icon('../../assets/marker.png', new BMap.Size(30, 50), { anchor: new BMap.Size(15, 50) }),
        speed: 500,
        enableRotation: false,//是否设置marker随着道路的走向进行旋转
        landmarkPois: [
          // { lng: this.points[100].lng, lat: this.points[100].lat, html: '加油站', pauseTime: 1 },
          // { lng: this.points[200].lng, lat: this.points[200].lat, html: '肯德基早餐', pauseTime: 1}
        ]
      };
      this.lushu = new BMapLib.LuShu(map, this.points, this.lushuOpt);
    }, 1000);
  }
  start() {
    this.lushu.start();
    let timer = setInterval(() => {
      console.log('out', timer);
      let li = this.lushu.i;
      let pc = this.points.length;
      console.log((li / pc).toFixed(2));
      if (li == (pc - 1)) {
        clearInterval(timer);
        console.log('stop', timer);
      }
    }, 1000)

  }
  stop() {
    this.lushu.stop();
  }
  pause() {
    this.lushu.pause();
  }
  hide() {
    this.lushu.hideInfoWindow();
  }
  show() {
    this.lushu.showInfoWindow();
  }
  speed1() {
    console.log(this.lushu)
    this.lushu._opts.speed = 3000;
  }
  speed2() {
    console.log(this.lushu)
    this.lushu._opts.speed = 300;
  }
}
