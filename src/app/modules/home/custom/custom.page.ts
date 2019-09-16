import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { SearchModel } from 'src/app/models/search.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { HttpService } from 'src/app/services/http.service';
import { UserService } from 'src/app/services/user.service';
import echarts from 'echarts';
import { CustomType } from 'src/app/enums/custom-type.enum';
import { ChartService } from 'src/app/services/chart.service';
import { ChartType } from 'src/app/enums/chart-type.enum';
import { Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.page.html',
  styleUrls: ['./custom.page.scss'],
})
export class CustomPage implements OnInit {
  pageModel = {
    title: null,
    col: null,
    url: null,
    total: null,
    unit: null,
    statistic: null,
    chartType: null,
  }
  searchModel: SearchModel = new SearchModel();
  dataList: Array<any> = [];
  @ViewChild('chartElement', null) chartElement: ElementRef;

  constructor(private util: UtilService,
    private router: Router,
    private toast: ToastService,
    private http: HttpService,
    private userService: UserService,
    private route: ActivatedRoute,
    private chartService: ChartService) { }

  ngOnInit() {
    let type = parseInt(this.route.snapshot.params['type']);
    switch (type) {
      case CustomType.duration:
        this.pageModel.title = '上线统计';
        this.pageModel.col = '上线时长';
        this.pageModel.url = '/api/list.json';
        this.pageModel.total = '上线总时长';
        this.pageModel.unit = 'h';
        this.pageModel.chartType = ChartType.bar;
        break;
      case CustomType.mileage:
        this.pageModel.title = '里程统计';
        this.pageModel.col = '行驶里程';
        this.pageModel.url = '/api/list.json';
        this.pageModel.total = '行驶总里程';
        this.pageModel.unit = 'km';
        this.pageModel.chartType = ChartType.line;
        break;
      case CustomType.consumption:
        this.pageModel.title = '油耗统计';
        this.pageModel.col = '行驶油耗';
        this.pageModel.url = '/api/list.json';
        this.pageModel.total = '行驶总油耗';
        this.pageModel.unit = 'L';
        this.pageModel.chartType = ChartType.line;
        break;
      case CustomType.nox:
        this.pageModel.title = 'NOx排放统计';
        this.pageModel.col = 'NOx排放量';
        this.pageModel.url = '/api/list.json';
        this.pageModel.total = 'NOx排放总量';
        this.pageModel.unit = 'L';
        this.pageModel.chartType = ChartType.line;
        break;
      case CustomType.faults:
        this.pageModel.title = '故障统计';
        this.pageModel.col = '故障数';
        this.pageModel.url = '/api/list.json';
        this.pageModel.total = '故障总数';
        this.pageModel.unit = '次';
        this.pageModel.chartType = ChartType.bar;
        break;
      default:
        break;
    }
    this.search();
  }

  search() {
    this.http.getCustomData(this.pageModel.url).subscribe((d: Result) => {
      let dataOrg = this.makeData();
      let dateOrg = this.makeDate();
      ///////////////////////////////
      this.dataList = [];
      dateOrg.forEach(e => {
        let temp = dataOrg.find(f => {
          return this.util.getDayStart(this.util.stringToDate(f.date)).getTime() == this.util.getDayStart(e).getTime();
        })
        if (!this.util.isNull(temp)) {
          this.dataList.push({ date: temp.date, data: temp.data });
        } else {
          this.dataList.push({ date: this.util.dateToYYMMDD(e), data: 0 });
        }
      })
      ///////////////////////////////
      let sum = 0;
      this.dataList.forEach(e => {
        sum += e.data;
      })
      this.pageModel.statistic = this.pageModel.total + sum + this.pageModel.unit;
      let chart = echarts.init(this.chartElement.nativeElement);
      let xData = this.dataList.map(x => {
        return x.date;
      })
      let yData = this.dataList.map(x => {
        return x.data;
      })
      let option = this.chartService.makeLineOrBarChartOption(this.pageModel.title, this.pageModel.chartType, xData, yData);
      chart.setOption(option);
    })
  }

  makeData() {
    let arr = [];
    for (let i = 0; i < 3; i++) {
      arr.push({ date: this.util.dateToYYMMDD(this.util.addDay(new Date(), -i)), data: this.util.getIntRandom(0, 200) });
    }
    arr.reverse();
    return arr;
  }
  makeDate() {
    let arr = [];
    for (let i = 0; i < this.util.getDiffDays(new Date(this.searchModel.startDate), new Date(this.searchModel.endDate)) + 1; i++) {
      arr.push(this.util.addDay(new Date(this.searchModel.startDate), i));
    }
    return arr;
  }

}

