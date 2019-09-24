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
    type: null,
    title: null,
    col: null,
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
    this.pageModel.type = parseInt(this.route.snapshot.params['type']);
    switch (this.pageModel.type) {
      case CustomType.days:
        this.pageModel.title = '上线统计';
        this.pageModel.col = '上报数据';
        this.pageModel.total = '上报数据总数';
        this.pageModel.unit = '条';
        this.pageModel.chartType = ChartType.bar;
        break;
      case CustomType.mile:
        this.pageModel.title = '里程统计';
        this.pageModel.col = '行驶里程';
        this.pageModel.total = '行驶总里程';
        this.pageModel.unit = 'km';
        this.pageModel.chartType = ChartType.line;
        break;
      case CustomType.oil:
        this.pageModel.title = '油耗统计';
        this.pageModel.col = '行驶油耗';
        this.pageModel.total = '行驶总油耗';
        this.pageModel.unit = 'L';
        this.pageModel.chartType = ChartType.line;
        break;
      case CustomType.nox:
        this.pageModel.title = 'NOx排放统计';
        this.pageModel.col = 'NOx排放量';
        this.pageModel.total = 'NOx排放总量';
        this.pageModel.unit = 'L';
        this.pageModel.chartType = ChartType.line;
        break;
      case CustomType.faults:
        this.pageModel.title = '故障统计';
        this.pageModel.col = '故障数';
        this.pageModel.total = '故障总数';
        this.pageModel.unit = '次';
        this.pageModel.chartType = ChartType.bar;
        break;
      default:
        break;
    }
    setTimeout(() => {
      this.search();
    }, 500);
  }

  search() {
    this.http.getCustomData(this.userService.user.vin.id,
      this.pageModel.type,
      this.util.getDayStart(new Date(this.searchModel.dateStart)).getTime(),
      this.util.getDayEnd(new Date(this.searchModel.dateEnd)).getTime()).subscribe((d: Result) => {
        console.log(d);
        if (d.success) {
          let dataOrg = [];
          switch (this.pageModel.type) {
            case CustomType.days:
              dataOrg = d.data.map(x => { return { id: x.VID, date: x.DATETIME, data: x.C_NUM }; });
              break;
            case CustomType.mile:
              dataOrg = d.data.map(x => { return { id: x.VID, date: x.DATETIME, data: x.C_MIL }; });
              break;
            case CustomType.oil:
              dataOrg = d.data.map(x => { return { id: x.VID, date: x.DATETIME, data: x.C_OIL }; });
              break;
            case CustomType.nox:
              dataOrg = d.data.map(x => { return { id: x.VID, date: x.DATETIME, data: x.C_NOX }; });
              break;
            case CustomType.faults:
              dataOrg = d.data.map(x => { return { id: x.VID, date: x.DATETIME, data: x.NUMS }; });
              break;
            default:
              break;
          }
          ///////////////////////////////
          let dateOrg = this.makeDate();
          this.dataList = [];
          dateOrg.forEach(e => {
            let temp = dataOrg.find(f => {
              return this.util.getDayStart(new Date(f.date)).getTime() == this.util.getDayStart(e).getTime();
            })
            if (!this.util.isNull(temp)) {
              this.dataList.push({ date: this.util.dateToYYMMDD(new Date(temp.date)), data: temp.data });
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
          ///////////////////////////////
          let chart = echarts.init(this.chartElement.nativeElement);
          let xData = this.dataList.map(x => {
            return x.date;
          })
          let yData = this.dataList.map(x => {
            return x.data;
          })
          let option = this.chartService.makeLineOrBarChartOption(this.pageModel.title, this.pageModel.chartType, xData, yData);
          chart.setOption(option);
        }
      })
  }
  makeDate() {
    let arr = [];
    for (let i = 0; i < this.util.getDiffDays(new Date(this.searchModel.dateStart), new Date(this.searchModel.dateEnd)) + 1; i++) {
      arr.push(this.util.addDay(new Date(this.searchModel.dateStart), i));
    }
    return arr;
  }

}

