import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
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
  constructor(private http: HttpService) { }
  ngOnInit() {
    this.http.getTrackPoints().subscribe((d: any) => {
      this.points = d.map(x => {
        return new BMap.Point(x.lng, x.lat);
        //return {lng:x.lng,lat: x.lat};
      })
      console.log(this.points.length);
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
            { lng: this.points[100].lng, lat: this.points[100].lat, html: '加油站', pauseTime: 1 },
            { lng: this.points[200].lng, lat: this.points[200].lat, html: '肯德基早餐', pauseTime: 1}
          ]
        };
        this.lushu = new BMapLib.LuShu(map, this.points, this.lushuOpt);
      }, 1000);
    })
  }
  start() {
    this.lushu.start();
    let timer= setInterval(()=>{
      let li=this.lushu.i;
      let pc=this.points.length;
      console.log((li/pc).toFixed(2));
      if(li==(pc-1)){
        clearInterval(timer);
      }
    },200)
    
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
    this.lushu._opts.speed=3000;
  }
  speed2() {
    console.log(this.lushu)
    this.lushu._opts.speed=300;
  }
}
