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
  selector: 'app-money-dynamic-balance',
  templateUrl: './money-dynamic-balance.component.html',
  styleUrls: ['./money-dynamic-balance.component.css']
})
export class MoneyDynamicBalanceComponent implements OnInit {
  
  chartDataSource:any;
    
  chartSeries: any = [{
        argumentField: "Date",
        valueField: 'Amount',
        type: 'line',
        color: '#DA5859',
        point: {
            visible: false
        }
    }];
  
  customizeLegendText:any;
  
  valueAxis: any = [{
        visible: true,
        label: {
            overlappingBehavior:'stagger',
            customizeText: function(e){
                var labelText;
                labelText = numeral(e.value).format('(0,0.00a)');
                return labelText;
            }
        },
        format: 'decimal'
    }];
  
  tooltip: any = {
                enabled: true,
                shared: true,
                format: {
                    style: 'decimal'
                },            
                customizeTooltip: function (point) {
                    var items = ''.split('\n');
                    var obj = $('<div>').css('text-align', 'center').css('line-height', '15px').css('margin-bottom', '10px');
                    obj.append($('<span>').text(moment(point.argument).format("ll"))); //(point.argument) //Globalize.dateFormatter({date: "medium"}) перед (point... было
                    obj.append($('<br />'));
                    obj.append($('<b>').text(numeral(point.value).format('(0,0.00a)')).css('color', point.point.getColor()).css('font-size', '20px').css('font-weight', 'normal'));
                    items[0] = obj.prop('outerHTML');  
                    return { html: items.join('\n') };
                }
            };
    
  @ViewChild("myChart") myChart: MoneyDynamicChartComponent;

  constructor() { }

  ngOnInit() {
      this.myChart.chartData.StartDate = new Date();
      this.myChart.getNextPeriod('');
      
      this.reloadChartDataSource();
      
      var self = this;
      this.customizeLegendText = function(){
        let curChartData = self.myChart.chartData;
        var newLegend:string;
        var dateFrom = moment(curChartData.StartDate).toDate();

        switch (curChartData.Type) {
            case 'year':
                newLegend = moment(dateFrom).format('YYYY');
                break;
            case 'quarter':
                newLegend = moment(dateFrom).format('Q, YYYY');
                break;
            case 'month':
                newLegend = moment(dateFrom).locale('ru').format('MMMM') + ', ' + moment(dateFrom).format('YYYY');
                break;
        }

        return newLegend;
    }
      
  }

  reloadChartDataSource()
  {
      let self = this;
      this.chartDataSource = new DataSource({
        load: function (loadOptions) {
            self.myChart.showLoadingIndicator();
            
            return RestClientService.get("GetMoneyBalanceByDays", self.myChart.chartData)
                .done(function (result) {
                    for (var n in result) {
                        result[n].Date = moment(result[n].Date).toDate();
                    }
                });
        }
    });
  }
  
}
