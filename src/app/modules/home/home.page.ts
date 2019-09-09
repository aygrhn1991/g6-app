import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private http: HttpClient) { }
list:[];
  ngOnInit() {
    this.http.get('http://www.tonggeedu.com/test2/data.json').subscribe((d: []) => {
      console.log(d);
      this.list = d;
    })
  }

}
