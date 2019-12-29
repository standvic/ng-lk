import { Component, OnInit, ViewChild } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import * as numeral from 'numeral';
import 'numeral/locales/ru';
import * as moment from "moment";
import 'moment/locale/ru';
import * as $ from 'jquery';
import DataSource from 'devextreme/data/data_source';
import { MoneyDynamicChartComponent } from '../../components/money-dynamic-chart/money-dynamic-chart.component';
import {RestClientService} from '../../services/rest-client/rest-client.service';

@Component({
  selector: 'app-profit-trends',
  templateUrl: './profit-trends.component.html',
  styleUrls: ['./profit-trends.component.css']
})
export class ProfitTrendsComponent implements OnInit {
  chartDataSource:any;
  
  chartSeries: any;
  
  commonSeriesSettings: any = {
        argumentField: 'state',
        type: 'stackedBar',
        label: {
            visible: false
        }
    };
    
  argumentAxis: any = {
        argumentType: 'datetime',
        label: {
            type: 'monthAndYear',
        },
        grid: {
            visible: true
        }
    };
  
  valueAxis: any;

  tooltip: any = {
                enabled: true,
                shared: true,
                format: {
                    type: 'largeNumber',
                    precision: 1
                },
                font: {
                    color: '#959595'
                },                
                customizeTooltip: function (arg) {
                    var points = arg.points,
                        items = arg.valueText.split('\n');
                    $.each(points, function (index, point) {                        
                        var seriesName = (point.seriesName.split(','))[0];
                        var valueText = '';
                        switch (seriesName) {
                            case 'ВЫРУЧКА':
                                valueText = numeral(point.total).format('(0.00a)');
                                break;
                            case 'НАЦЕНКА':
                                valueText = numeral(point.value).format('(0.00%)');
                                break;
                            case 'ПРИБЫЛЬ':
                                valueText = numeral(point.value).format('(0.00a)');
                                break;
                        };
                        var obj = $('<div>').css('text-align', 'center').css('line-height', '15px').css('margin-bottom', '10px');
                        obj.append($('<span>').text(seriesName));
                        obj.append($('<br />'));
                        obj.append($('<b>').text(valueText).css('color', point.point.getColor()).css('font-size', '20px').css('font-weight', 'normal'));
                        items[index] = obj.prop('outerHTML');
                    });
                    return { html: items.join('\n') };
                }
            };
  
  chartCaption: string; 
  
  @ViewChild("myChart") myChart: MoneyDynamicChartComponent;
    
  constructor(private translate: TranslateService) { }

  ngOnInit() {
      this.InitWithTranslate();
      this.myChart.chartData.StartDate = new Date();
      this.myChart.getNextPeriod('');
      this.reloadChartDataSource();
  }
  
  InitWithTranslate()
  {
      var needTranslate = [
                'PROFIT_TRANDS_PAGE.CHART.SERIES.SERIE1',
                'PROFIT_TRANDS_PAGE.CHART.SERIES.SERIE2',
                'PROFIT_TRANDS_PAGE.CHART.SERIES.SERIE3',
                
                'PROFIT_TRANDS_PAGE.CHART.VALUE_AXIS.AXIS1',
                'PROFIT_TRANDS_PAGE.CHART.VALUE_AXIS.AXIS2'
      ];
      var self = this;
      this.translate.get(needTranslate, null).subscribe((res: string) => {
          self.chartSeries = [{
              name: res['PROFIT_TRANDS_PAGE.CHART.SERIES.SERIE1'],
              axis: 'amount',
              argumentField: 'WeekStarts',
              valueField: 'AmountProfit',
              point: {
                  visible: true
              },
              color: '#DA5859'
          }, {
              name: res['PROFIT_TRANDS_PAGE.CHART.SERIES.SERIE2'],
              axis: 'amount',
              argumentField: 'WeekStarts',
              valueField: 'AmountAdd',
              tag: 'calculateTotal',
              point: {
                  visible: false
              }
          }, {
              name: res['PROFIT_TRANDS_PAGE.CHART.SERIES.SERIE3'],
              axis: 'percent',
              type: 'spline',
              argumentField: 'WeekStarts',
              valueField: 'AmountProfitPercent',
              tag: 'calculatePercent',
              point: {
                  visible: false
              },
              color: '#008FD8',
          }];
          
          self.valueAxis = [{
                name: 'amount',
                position: 'left',
                visible: true,
                label: {
                    format: 'largeNumber'
                },
                format: 'decimal',
                title: {
                    text: res['PROFIT_TRANDS_PAGE.CHART.VALUE_AXIS.AXIS1']
                }
            }, {
                name: 'percent',
                position: 'right',
                visible: true,
                showZero: true,
                label: {
                    format: 'percent'
                },
                title: {
                    text: res['PROFIT_TRANDS_PAGE.CHART.VALUE_AXIS.AXIS2']
                },
                constantLines: [{
                    value: 1,
                    color: 'orangered',
                    width: 1,
                    dashStyle: 'dash',
                    label: {
                        horizontalAlignment: 'right'
                    }
                }]
            }];
      });
  }
  
  reloadChartDataSource()
  {
      let self = this;
      this.chartDataSource = new DataSource({
        load: function (loadOptions) {
            self.myChart.showLoadingIndicator();
            
            return RestClientService.get("GetMoneyProfitByWeeks", self.myChart.chartData)
                .done(function (result) {
                    for (var n in result) {
                        result[n].WeekStarts = moment(result[n].WeekStarts).toDate();
                    }
                });
        }
    });
  }
}
