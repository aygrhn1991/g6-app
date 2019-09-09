import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private http:HttpClient) {

    this.http.get('http://www.tonggeedu.com/test2/data.json').subscribe(d=>{
      console.log(d);
    })


  }


}
