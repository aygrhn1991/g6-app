import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { SearchModel } from 'src/app/models/search.model';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-onlinelog',
  templateUrl: './onlinelog.page.html',
  styleUrls: ['./onlinelog.page.scss'],
})
export class OnlinelogPage implements OnInit {
  searchModel: SearchModel = new SearchModel();
  dataList:Array<any>=[];
  constructor(private util: UtilService,
    private router: Router,
    private toast: ToastService,
    private http: HttpService,
    private userService: UserService) { }

  ngOnInit() { 
    this.getOnlineLog();
  }

  search() {
    console.log(new Date(this.searchModel.startDate));
  }

  getOnlineLog() {
    this.http.getOnlineLog().subscribe((d:Array<any>)=>{
      this.dataList=d;
    })
  }

}
