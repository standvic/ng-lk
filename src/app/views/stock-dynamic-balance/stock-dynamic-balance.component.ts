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
  selector: 'app-stock-dynamic-balance',
  templateUrl: './stock-dynamic-balance.component.html',
  styleUrls: ['./stock-dynamic-balance.component.css']
})
export class StockDynamicBalanceComponent implements OnInit {
  chartDataSource:any;
  
  chartSeries: any;
  
  commonSeriesSettings: any;
    
  argumentAxis: any = {
        argumentType: "datetime",
        grid: {
            visible: true
        }
    };
    
  valueAxis: any;

  tooltip: any = {
                enabled: true,
                shared: true,
                format: {
                    style: "decimal"
                },
                customizeTooltip: function (arg) {
                    var points = arg.points,
                        items = arg.valueText.split('\n');
                    $.each(points, function (index, point) {
                        var seriesName = (point.seriesName.split(','))[0];
                        var valueText = '';
                        switch (point.point.getOptions().tag) {
                            case 'value':
                                valueText = numeral(point.value).format('0.00');
                                break;
                            default:
                                valueText = numeral(point.value).format('0,0.00a');
                                break;
                        }
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
      this.myChart.getNextPeriod('');
      this.reloadChartDataSource();
  }
  
  InitWithTranslate()
  {
      var needTranslate = [
                'STOCK_DYNAMIC_BALANCE_PAGE.CHART.SERIES.SERIE1',
                'STOCK_DYNAMIC_BALANCE_PAGE.CHART.SERIES.SERIE2',
                
                'STOCK_DYNAMIC_BALANCE_PAGE.CHART.AXIS.AXIS1',
                'STOCK_DYNAMIC_BALANCE_PAGE.CHART.AXIS.AXIS2'
      ];
      var self = this;
      this.translate.get(needTranslate, null).subscribe((res: string) => {
            self.chartSeries = [{
                name: res['STOCK_DYNAMIC_BALANCE_PAGE.CHART.SERIES.SERIE1'],
                argumentField: "OnDate",
                axis: 'remaining',
                valueField: 'Amount',
                type: 'line',
                tag: 'amount',
                point: {
                    visible: false
                }
            }, {
                name: res['STOCK_DYNAMIC_BALANCE_PAGE.CHART.SERIES.SERIE2'],
                argumentField: "OnDate",
                axis: 'turnover',
                valueField: 'Turnover',
                type: 'line',
                tag: 'value',
                point: {
                    visible: false
                }
            }];
          self.valueAxis = [{
                name: 'remaining',
                position: 'left',
                visible: true,
                label: {
                    format: 'largeNumber'
                },
                format: 'currency',
                title: {
                    text: res['STOCK_DYNAMIC_BALANCE_PAGE.CHART.AXIS.AXIS1']
                }
            }, {
                name: 'turnover',
                position: 'right',
                visible: true,
                title: {
                    text: res['STOCK_DYNAMIC_BALANCE_PAGE.CHART.AXIS.AXIS2']
                }
            }];
      });
  }
  
  reloadChartDataSource()
  {
      let self = this;
      this.chartDataSource = new DataSource({
        load: function (loadOptions) {
            self.myChart.showLoadingIndicator();
            
            return RestClientService.get("GetStockBalanceByDays", self.myChart.chartData)
                .done(function (result) {
                    for (var n in result) {
                        result[n].OnDate = moment(result[n].OnDate).toDate();
                    }
                });
        }
    });
  }
  
}