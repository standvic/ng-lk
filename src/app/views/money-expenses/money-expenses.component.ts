import { Component, OnInit, ViewChild } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DateUtilsService} from '../../services/date-utils/date-utils.service';
import * as numeral from 'numeral';
import 'numeral/locales/ru';
import * as moment from "moment";
import 'moment/locale/ru';
import * as $ from 'jquery';
import { RangeSelectorComponent } from '../../components/range-selector/range-selector.component';
import { DoughnutComponent } from '../../components/doughnut/doughnut.component';
import CustomStore from 'devextreme/data/custom_store';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import { DxPivotGridComponent, DxChartComponent } from "devextreme-angular";
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-money-expenses',
  templateUrl: './money-expenses.component.html',
  styleUrls: ['./money-expenses.component.css']
})
export class MoneyExpensesComponent implements OnInit {
  nextBtnDisabled: boolean = true;
  
  series: any = {
        argumentField: 'OnDate',
        valueField: 'Amount',
        type: 'line',
        color: '#DA5859'
    };
  
  currDate = new Date();
  endSelected = new Date(this.currDate.setMonth(this.currDate.getMonth() - 1)); 
  startSelected = DateUtilsService.getLastMonthsDay(6);
  endScale:Date = new Date();
  startScale = DateUtilsService.getLastMonthsDay(12);
  
  pivotData = {
        'Type': 'year',
        'StartDate': this.startScale,
        'EndDate': this.endScale
    };
  
  rangeDataSource: any;
  
  chartValueAxis:any = [{
                name: 'amount',
                position:'left',
                visible: true,
                label: {
                    customizeText: function () {
                        var labelText;
                        labelText = numeral(this.value).format('0.00a');
                        return labelText;
                    }
                },
                format: "decimal"
            }];
  
  chartTooltip:any = {
                enabled: true,
                format: {
                    type: 'currency',
                    precision: 2
                },
                customizeTooltip: function (point) {
                        var items = ''.split('\n');
                        var obj = $('<div>').css('text-align', 'center').css('line-height', '15px').css('margin-bottom', '10px');
                        obj.append($('<span>').text(point.seriesName));
                        obj.append($('<br />'));
                        obj.append($('<b>').text(numeral(point.valueText).format('0.00a')).css('color', point.point.getColor()).css('font-size', '20px').css('font-weight', 'normal'));
                        items[0] = obj.prop('outerHTML');          
                    return { html: items.join('\n') };
                }
            };
            
  chartArgumentAxis:any = {
                argumentType: "date",
                tickInterval: "month",
                label: {
                    format: "monthAndYear"
                },
                grid: {
                    visible: true
                }
            };
            
  chartExpensesByMonthData:any;
            
  names:any = [];
  
  gridFields:any;
  
  gridStore:any;
                
  @ViewChild("dateRangeSelector") myDateRangeSelector: RangeSelectorComponent;
  @ViewChild("doughnut") doughnut: DoughnutComponent;
  @ViewChild("myChart") myChart: DxChartComponent;
  @ViewChild("pivotGrid") pivotGrid: DxPivotGridComponent;
  
  constructor(private translate: TranslateService) { }
  
  ngOnInit() {
      this.InitWithTranslate();
      this.myDateRangeSelector.scaleStartValue = this.startScale;
      this.myDateRangeSelector.scaleEndValue = this.endScale;
      this.reloadRangeDataSource();
      this.reloadChartExpensesByMonthData();
      this.reloadGridStore();
  }
  
  InitWithTranslate()
  {
      var needTranslate = [
                'MONEY_EXPENSES_PAGE.PIVOT_GRID.FIELDS.FIELD1',
                'MONEY_EXPENSES_PAGE.PIVOT_GRID.FIELDS.FIELD2',
                'MONEY_EXPENSES_PAGE.PIVOT_GRID.FIELDS.FIELD3',
                'MONEY_EXPENSES_PAGE.PIVOT_GRID.FIELDS.FIELD4'
      ];
      var self = this;
      this.translate.get(needTranslate, null).subscribe((res: string) => {
            self.gridFields = [{
                    dataField: "CostItemNameLevel1",
                    caption: res['MONEY_EXPENSES_PAGE.PIVOT_GRID.FIELDS.FIELD1'],
                    area: "row",
                    sortOrder: 'desc',
                    sortBySummaryField: "Amount"
                }, {
                    dataField: "CostItemNameLevel2",
                    caption: res['MONEY_EXPENSES_PAGE.PIVOT_GRID.FIELDS.FIELD2'],
                    area: "row",
                    sortOrder: 'desc',
                    sortBySummaryField: "Amount"
                }, {
                    dataField: "Amount",
                    width: 100,
                    caption: res['MONEY_EXPENSES_PAGE.PIVOT_GRID.FIELDS.FIELD3'],
                    dataType: "number",
                    summaryType: "sum",
                    format: "currency",
                    precision: 2,
                    area: "data"
                },{
                    dataField: "OnDate",
                    caption: res['MONEY_EXPENSES_PAGE.PIVOT_GRID.FIELDS.FIELD4'],
                    dataType: "date",
                    format: "date",
                    area: "column",
                    sortBySummaryField: "Amount"
                }];
      });
  }
  
  leftArrowClick(){
      this.nextBtnDisabled = false;
      
      var newDate = new Date(this.currDate.getFullYear() - 1, this.currDate.getMonth(), this.currDate.getDate());
      this.currDate = newDate;
      this.startScale = DateUtilsService.getYearFirstDay(this.currDate);
      this.endScale = DateUtilsService.getYearLastDay(this.currDate);
      
      this.pivotData.StartDate = this.startScale;
      this.pivotData.EndDate = this.endScale;
      
      this.myDateRangeSelector.scaleStartValue = this.startScale;
      this.myDateRangeSelector.scaleEndValue = this.endScale;

      var lastDayPrevYear = DateUtilsService.getYearLastDay(this.currDate);
      lastDayPrevYear.setMonth(lastDayPrevYear.getMonth() - 6);
      this.startSelected = lastDayPrevYear;
      this.endSelected = DateUtilsService.getYearLastDay(this.currDate);
      
      this.reloadRangeDataSource();
  }
  
  rightArrowClick(){
      var newDate = new Date(this.currDate.getFullYear() + 1, this.currDate.getMonth(), this.currDate.getDate());
      this.currDate = newDate;
      this.startScale = DateUtilsService.getYearFirstDay(this.currDate);
      this.endScale = DateUtilsService.getYearLastDay(this.currDate);
      
      this.pivotData.StartDate = this.startScale;
      this.pivotData.EndDate = this.endScale;
      
      this.myDateRangeSelector.scaleStartValue = this.startScale;
      this.myDateRangeSelector.scaleEndValue = this.endScale;

      var firstDayNextYear = DateUtilsService.getYearFirstDay(this.currDate);
      firstDayNextYear.setMonth(firstDayNextYear.getMonth() + 6);
      this.endSelected = firstDayNextYear;
      this.startSelected = DateUtilsService.getYearFirstDay(this.currDate);
      this.reloadRangeDataSource();
      
      this.nextBtnDisabled = this.endSelected.getFullYear() == (new Date()).getFullYear();
  }

  onRangeChanged(e)
  {
      var startDate = moment(DateUtilsService.getDateOnly(new Date(e.value[0]))).toISOString();
      var endDate = moment(DateUtilsService.getDateOnly(new Date(e.value[1]))).add(1, 'days').add(-1, 'seconds').toISOString();
      
      this.pivotData.StartDate = new Date(startDate);
      this.pivotData.EndDate = new Date(endDate);
      
      this.doughnut.moveToPeriod(startDate, endDate);
      this.reloadChartExpensesByMonthData();
      this.reloadGridStore();
  }
  
  reloadRangeDataSource()
  {
      let self = this;
      this.rangeDataSource= new DataSource({
        load: function (loadOptions: any) {
            return RestClientService.get('GetMoneyExpensesByDays', self.pivotData)
                .done(function (result) {
                    for (var n in result) {
                        result[n].OnDate = moment(result[n].OnDate).toDate();
                    };
                    var maxDate = DateUtilsService.getMinDate();
                    var minDate = DateUtilsService.getMaxDate();
                    $(result).each(function () {
                        maxDate = (maxDate < this.OnDate ? this.OnDate : maxDate);
                        minDate = (minDate > this.OnDate ? this.OnDate : minDate);
                    });
                    
                    self.myDateRangeSelector.value = [self.startSelected, self.endSelected];
                });
        }
    });
  }
  
  reloadChartExpensesByMonthData()
  {
      var self = this;
      this.chartExpensesByMonthData = new DataSource({ 
        load: function (loadOptions) {
            return RestClientService.get('GetMoneyExpensesDetailedByMonth', self.pivotData)
                .done(function (result) {
                    for (var i in result) {
                        result[i].date = moment(result[i].OnDate).toDate();
                    };
                    self.names = result[result.length-1].Articles;
                    self.myChart.instance.option("series", [
                        { valueField: "Amount0", name: self.names[0]},
                        { valueField: "Amount1", name: self.names[1]},
                        { valueField: "Amount2", name: self.names[2]},
                        { valueField: "Amount3", name: self.names[3]},
                        { valueField: "Amount4", name: self.names[4]},
                        { valueField: "Amount5", name: self.names[5]}
                    ]);
                });
        }
    });
  }
  
  reloadGridStore()
  {
      var self = this;
      this.gridStore = new CustomStore({
        load: function (loadOptions) {
            return RestClientService.get("GetMoneyExpensesDetailed", self.pivotData)
                .done(function (result) {
                    for (var n in result) {
                        result[n].OnDate = moment(result[n].OnDate).toDate();
                    };
                });
        }
    });
  }
}
