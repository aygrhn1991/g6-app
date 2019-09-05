import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var BMap: any;
declare var BMAP_ANIMATION_BOUNCE: any;
@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  @ViewChild('mapElement', null) mapElement: ElementRef;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    setTimeout(()=>{
      var map = new BMap.Map(this.mapElement.nativeElement);
      var point = new BMap.Point(116.404, 38.915);
      map.centerAndZoom(point, 15);
      var marker = new BMap.Marker(point);
      map.addOverlay(marker);
    },1000);
    
  }
}
