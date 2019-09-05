import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var BMap: any;
declare var BMAP_ANIMATION_BOUNCE: any;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  list: [];
  @ViewChild('mapElement', null) mapElement: ElementRef;
  constructor(private http: HttpClient) {
    this.http.get('http://www.tonggeedu.com/test2/data.json').subscribe((d: []) => {
      console.log(d);
      this.list = d;
    })

setTimeout(e=>{
  var map = new BMap.Map(this.mapElement.nativeElement);
  var point = new BMap.Point(116.404, 39.915);
  map.centerAndZoom(point, 15);
  var marker = new BMap.Marker(point);  // 创建标注
  map.addOverlay(marker);               // 将标注添加到地图中
  marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
},1000)
    
  }



}
