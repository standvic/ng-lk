import { Component, OnInit, ViewChild } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DateUtilsService} from '../../services/date-utils/date-utils.service';
import * as numeral from 'numeral';
import 'numeral/locales/ru';
import * as moment from "moment";
import 'moment/locale/ru';
import * as $ from 'jquery';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-articles-turnover',
  templateUrl: './articles-turnover.component.html',
  styleUrls: ['./articles-turnover.component.css']
})
export class ArticlesTurnoverComponent implements OnInit {
  chartDataSource:any;
  
  chartValueAxis:any;
  chartTooltip:any={
                enabled: true,
                shared: true,
                font: {
                    color: '#959595'
                },                
                customizeTooltip: function (arg) {
                        var points = arg.points,
                        items = arg.valueText.split('\n');
                    $.each(points, function (index, point) {                        
                        var seriesName = (point.seriesName.split(','))[0];
                        var valueText = numeral(point.value).format('0.00') + ' дней';
                        var obj = $('<div>').css('text-align', 'center').css('line-height', '15px').css('margin-bottom', '10px');
                        obj.append($('<span>').text(seriesName));
                        obj.append($('<br />'));
                        obj.append($('<b>').text(valueText).css('color', point.point.getColor()).css('font-size', '15px').css('font-weight', 'normal'));
                        items[index] = obj.prop('outerHTML');
                    });
                    return { html: items.join('\n') };
                }
            };
            
  chartSeries:any;
            
  dateBoxDate:Date = new Date();
  stockStandardsViolation:boolean = true;
  
  gridSource:any;
  
  gridColumns:any;
  
  constructor(private translate: TranslateService) { }

  ngOnInit() {
      this.InitWithTranslate();
      this.reloadChartDataSource();
      this.reloadGridSource();
  }
  
  InitWithTranslate()
  {
      var needTranslate = [
                'ARTICLES_TURNOVER_PAGE.CHART.AXIS.AXIS1',
                
                'ARTICLES_TURNOVER_PAGE.CHART.SERIES.SERIE1',
                
                'ARTICLES_TURNOVER_PAGE.GRID.FIELDS.FIELD1',
                'ARTICLES_TURNOVER_PAGE.GRID.FIELDS.FIELD2',
                'ARTICLES_TURNOVER_PAGE.GRID.FIELDS.FIELD3',
                'ARTICLES_TURNOVER_PAGE.GRID.FIELDS.FIELD4',
                'ARTICLES_TURNOVER_PAGE.GRID.FIELDS.FIELD5',
                'ARTICLES_TURNOVER_PAGE.GRID.FIELDS.FIELD6',
                'ARTICLES_TURNOVER_PAGE.GRID.FIELDS.FIELD7',
      ];
      var self = this;
      this.translate.get(needTranslate, null).subscribe((res: string) => {
          self.chartValueAxis = [{
                name: 'Value',
                position:'left',
                tickInterval: 10,
                format: 'decimal',
                title: {
                    text: res['ARTICLES_TURNOVER_PAGE.CHART.AXIS.AXIS1']
                }
            }];
          self.chartSeries = [{
                type: "line",
                name: res['ARTICLES_TURNOVER_PAGE.CHART.SERIES.SERIE1'],
                axis: 'Value',
                valueField: 'PaybackDays',
                color: '#DA5859',
                point: {
                    visible: false
                }
            }];
          self.gridColumns = [{
                dataField: 'StoreName',
                caption: res['ARTICLES_TURNOVER_PAGE.GRID.FIELDS.FIELD1']
            },  {
                dataField: 'ArticleName',
                caption: res['ARTICLES_TURNOVER_PAGE.GRID.FIELDS.FIELD2']
            },  {
                dataField: 'BrandName',
                caption: res['ARTICLES_TURNOVER_PAGE.GRID.FIELDS.FIELD3']
            },  {
                dataField: 'SalesProfit',
                caption: res['ARTICLES_TURNOVER_PAGE.GRID.FIELDS.FIELD4'],
                format: {
                    style: 'decimal',
                    precision: 2
                }
            },  {
                dataField: 'AvailabilityPercent',
                caption: res['ARTICLES_TURNOVER_PAGE.GRID.FIELDS.FIELD5'],
                format: {
                    style: 'decimal',
                    precision: 2
                }
            },  {
                dataField: 'StockDays',
                caption: res['ARTICLES_TURNOVER_PAGE.GRID.FIELDS.FIELD6'],
                format: {
                    style: 'decimal',
                    precision: 2
                }
            },{
                dataField: 'StandartDays',
                caption: res['ARTICLES_TURNOVER_PAGE.GRID.FIELDS.FIELD7'],
                format: {
                    style: 'decimal',
                    precision: 2
                }
            }];
      });
  }
  
  reloadChartDataSource()
  {
      this.chartDataSource = new DataSource({
        load: function (loadOptions) {
            var chartDelivery={
                StartDate: DateUtilsService.getLastMonthsDay(6),
                EndDate: new Date(),
                StoreId: null
            };
            
            return RestClientService.get("GetArticlesTurnoverTrendReport", chartDelivery)
                .done(function (result) {
                    for (var n in result) {
                        result[n].TransactionDate = moment(result[n].TransactionDate).toDate();
                    };
                });
        }
    });
  }
  
  reloadGridSource()
  {
      var self = this;
      this.gridSource = new DataSource({
        load: function (loadOptions) {
            var chartDebts = {
                Date: self.dateBoxDate,
                TurnoverDays: 180,
                FilterVendors: null,
                FilterGroups: null,
                OnlyFailedNormativeStock: self.stockStandardsViolation,
                IsShowArticles: true
            };
            return RestClientService.get("GetArticlesTurnoverReport", chartDebts)
                .done(function (result) {});
        }       
    });
  }
  
  onDateChange(e)
  {
      this.dateBoxDate = e.value;
      this.reloadGridSource();
  }
  
  onCheckedChanged(e)
  {
      if (e.value == true)
      {
          this.stockStandardsViolation = true;
      }
      else
      {
          this.stockStandardsViolation = false;
      }
      
      this.reloadGridSource();
  }
}
