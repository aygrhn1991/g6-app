import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var BMap: any;

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
      var point = new BMap.Point(116.3512761582, 39.9154689363);
      map.centerAndZoom(point, 17);
      var marker = new BMap.Marker(point);
      map.addOverlay(marker);
    },1000);
    
  }
}
