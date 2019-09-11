import { Injectable } from '@angular/core';
import { ChartType } from '../enums/chart-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  makeLineOrBarChartOption(title: string, chartType: ChartType, xData: Array<any>, yData: Array<any>) {
    let option = {
      title: {
        text: title
      },
      xAxis: {
        axisLabel: {
          interval: 0,
          rotate: 30
        },
        data: xData
      },
      yAxis: {},
      series: [{
        type: ChartType[chartType],
        data: yData
      }]
    };
    return option;
  }

  makePieChartOption() {

  }
}
