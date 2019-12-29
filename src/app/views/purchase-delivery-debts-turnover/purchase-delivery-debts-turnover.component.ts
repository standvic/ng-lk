import { Component, OnInit } from '@angular/core';
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
  selector: 'app-purchase-delivery-debts-turnover',
  templateUrl: './purchase-delivery-debts-turnover.component.html',
  styleUrls: ['./purchase-delivery-debts-turnover.component.css']
})
export class PurchaseDeliveryDebtsTurnoverComponent implements OnInit {
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
  deliveryTimeViolation:boolean = true;
  
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
                'PURCHASE_DELIVERY_DEBTS_TURNOVER_PAGE.CHART.AXIS.AXIS1',
                
                'PURCHASE_DELIVERY_DEBTS_TURNOVER_PAGE.CHART.SERIES.SERIE1',
                
                'PURCHASE_DELIVERY_DEBTS_TURNOVER_PAGE.GRID.FIELDS.FIELD1',
                'PURCHASE_DELIVERY_DEBTS_TURNOVER_PAGE.GRID.FIELDS.FIELD2',
                'PURCHASE_DELIVERY_DEBTS_TURNOVER_PAGE.GRID.FIELDS.FIELD3',
                'PURCHASE_DELIVERY_DEBTS_TURNOVER_PAGE.GRID.FIELDS.FIELD4',
                'PURCHASE_DELIVERY_DEBTS_TURNOVER_PAGE.GRID.FIELDS.FIELD5',
                'PURCHASE_DELIVERY_DEBTS_TURNOVER_PAGE.GRID.FIELDS.FIELD6',
      ];
      var self = this;
      this.translate.get(needTranslate, null).subscribe((res: string) => {
          self.chartValueAxis = [{
                name: 'Value',
                position:'left',
                tickInterval: 10,
                format: 'decimal',
                title: {
                    text: res['PURCHASE_DELIVERY_DEBTS_TURNOVER_PAGE.CHART.AXIS.AXIS1']
                }
            }];
          self.chartSeries = [{
                type: "line",
                name: res['PURCHASE_DELIVERY_DEBTS_TURNOVER_PAGE.CHART.SERIES.SERIE1'],
                axis: 'Value',
                valueField: 'PaybackDays',
                color: '#DA5859',
                point: {
                    visible: false
                }
            }];
          self.gridColumns = [{
                dataField: 'SupplierName',
                caption: res['PURCHASE_DELIVERY_DEBTS_TURNOVER_PAGE.GRID.FIELDS.FIELD1'],
                format: {
                    style: 'decimal'
                }
            },  {
                dataField: 'DeliveryTermName',
                caption: res['PURCHASE_DELIVERY_DEBTS_TURNOVER_PAGE.GRID.FIELDS.FIELD2'],
            },{
                dataField: 'AvgDebt',
                caption: res['PURCHASE_DELIVERY_DEBTS_TURNOVER_PAGE.GRID.FIELDS.FIELD3'],
                format: {
                    style: 'decimal'
                }
            },  {
                dataField: 'Payments',
                caption: res['PURCHASE_DELIVERY_DEBTS_TURNOVER_PAGE.GRID.FIELDS.FIELD4'],
                format: {
                    style: 'decimal',
                    precision: 2
                }
            },  {
                dataField: 'DeliveryTime',
                caption: res['PURCHASE_DELIVERY_DEBTS_TURNOVER_PAGE.GRID.FIELDS.FIELD5'],
                format: {
                    style: 'decimal',
                    precision: 2
                }
            },{
                dataField: 'AvgPayback',
                caption: res['PURCHASE_DELIVERY_DEBTS_TURNOVER_PAGE.GRID.FIELDS.FIELD6'],
                format: {
                    style: 'decimal'
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
                TurnoverDays: 180
            };
            
            return RestClientService.get("GetPurchaseDeliveryDebtsTurnoverTrendReport", chartDelivery)
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
            var chartDebts={
                Date: self.dateBoxDate,
                DeliveryTimeViolation: self.deliveryTimeViolation,
                TurnoverDays: 180
            };
            
            return RestClientService.get("GetPurchaseDeliveryDebtsTurnoverReport", chartDebts)
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
          this.deliveryTimeViolation = true;
      }
      else
      {
          this.deliveryTimeViolation = false;
      }
      
      this.reloadGridSource();
  }
  
}
