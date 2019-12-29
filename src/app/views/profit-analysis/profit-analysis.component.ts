import { Component, OnInit, ViewChild } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DateUtilsService} from '../../services/date-utils/date-utils.service';
import * as moment from "moment";
import 'moment/locale/ru';
import * as $ from 'jquery';
import { RangeSelectorComponent } from '../../components/range-selector/range-selector.component';
import { DoughnutComponent } from '../../components/doughnut/doughnut.component';
import CustomStore from 'devextreme/data/custom_store';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import { DxPivotGridComponent, DxCheckBoxComponent } from "devextreme-angular";
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-profit-analysis',
  templateUrl: './profit-analysis.component.html',
  styleUrls: ['./profit-analysis.component.css']
})
export class ProfitAnalysisComponent implements OnInit {
  nextBtnDisabled: boolean = true;
  
  series: any = {
        argumentField: 'OnDate',
        valueField: 'AmountSub',
        type: 'line',
        color: '#DA5859'
    };
  
  currDate = new Date();
  endSelected = new Date();
  startSelected = DateUtilsService.getLastMonthsDay(6);
  endScale:Date = new Date();
  startScale = DateUtilsService.getLastMonthsDay(12);
  
  pivotData = {
        'Type': 'year',
        'StartDate': this.startScale,
        'EndDate': this.endScale
    };
  
  rangeDataSource: any;
    
  myStore: any;
  
  fields:any;
  
  @ViewChild("dateRangeSelector") myDateRangeSelector: RangeSelectorComponent;
  @ViewChild("doughnut1") doughnut1: DoughnutComponent;
  @ViewChild("doughnut2") doughnut2: DoughnutComponent;
  @ViewChild("pivotGrid") pivotGrid: DxPivotGridComponent;
  @ViewChild("checkBox") checkBox: DxCheckBoxComponent;
  
  constructor(private translate: TranslateService) { }
  
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
  }

  onRangeChanged(e)
  {
      var startDate = moment(DateUtilsService.getDateOnly(new Date(e.value[0]))).toISOString();
      var endDate = moment(DateUtilsService.getDateOnly(new Date(e.value[1]))).add(1, 'days').add(-1, 'seconds').toISOString();
      
      this.doughnut1.moveToPeriod(startDate, endDate);
      this.doughnut2.moveToPeriod(startDate, endDate);
      
      this.pivotData.StartDate = new Date(startDate);
      this.pivotData.EndDate = new Date(endDate);
      
      this.reloadStore();
  }
  
  ngOnInit() {
      this.InitWithTranslate();
      this.myDateRangeSelector.scaleStartValue = this.startScale;
      this.myDateRangeSelector.scaleEndValue = this.endScale;
      this.reloadRangeDataSource();
      this.reloadStore();
  }
  
  InitWithTranslate()
  {
      var needTranslate = [
                'PROFIT_ANALYSIS_PAGE.PIVOT_GRID.FIELDS.FIELD1',
                'PROFIT_ANALYSIS_PAGE.PIVOT_GRID.FIELDS.FIELD2',
                'PROFIT_ANALYSIS_PAGE.PIVOT_GRID.FIELDS.FIELD3',
                'PROFIT_ANALYSIS_PAGE.PIVOT_GRID.FIELDS.FIELD4',
                'PROFIT_ANALYSIS_PAGE.PIVOT_GRID.FIELDS.FIELD5',
                'PROFIT_ANALYSIS_PAGE.PIVOT_GRID.FIELDS.FIELD6',
                'PROFIT_ANALYSIS_PAGE.PIVOT_GRID.FIELDS.FIELD7'
            ];
      var self = this;
      this.translate.get(needTranslate, null).subscribe((res: string) => {
            self.fields = [{
                    dataField: 'BrandName',
                    caption: res['PROFIT_ANALYSIS_PAGE.PIVOT_GRID.FIELDS.FIELD1'],
                    area: 'row',
                    sortOrder: 'desc',
                    sortBySummaryField: 'AmountProfit'
                }, {
                    dataField: 'GroupName',
                    caption: res['PROFIT_ANALYSIS_PAGE.PIVOT_GRID.FIELDS.FIELD2'],
                    area: 'row',
                    sortOrder: 'desc',
                    sortBySummaryField: 'AmountProfit'
                }, {
                    dataField: 'ArticleName',
                    caption: res['PROFIT_ANALYSIS_PAGE.PIVOT_GRID.FIELDS.FIELD3'],
                    area: 'row',
                    sortOrder: 'desc',
                    sortBySummaryField: 'AmountProfit'
                }, {
                    dataField: "OnDate",
                    caption: res['PROFIT_ANALYSIS_PAGE.PIVOT_GRID.FIELDS.FIELD4'],
                    dataType: "date",
                    format: "date",
                    area: "",
                    sortBySummaryField: "AmountSub"
                }, {
                    dataField: 'AmountSub',
                    width: 100,
                    caption: res['PROFIT_ANALYSIS_PAGE.PIVOT_GRID.FIELDS.FIELD5'],
                    dataType: 'number',
                    summaryType: 'sum',
                    format: {
                        type: 'currency',
                        currency: 'RUB',
                        precision: 2
                    },
                    area: 'data'
                }, {
                    dataField: 'AmountProfit',
                    width: 100,
                    caption: res['PROFIT_ANALYSIS_PAGE.PIVOT_GRID.FIELDS.FIELD6'],
                    dataType: 'number',
                    format: {
                        type: 'currency',
                        currency: 'RUB',
                        precision: 2
                    },
                    summaryType: 'sum',
                    area: 'data'
                }, {
                    dataField: 'AmountProfitPercent',
                    width: 100,
                    caption: res['PROFIT_ANALYSIS_PAGE.PIVOT_GRID.FIELDS.FIELD7'],
                    dataType: 'number',
                    format: {
                        type: 'percent',
                        precision: 2
                    },
                    summaryType: 'custom',
                    area: 'data',
                    calculateSummaryValue: function (options) {
                        var amountAdd = options.value('AmountSub') - options.value('AmountProfit');
                        var grandTotalSub = 0.0;
                        var grandTotalProfit = 0.0;
                        $.each(options._data.values, function (i, item) {
                            grandTotalSub += item[0][0];
                            grandTotalProfit += item[0][1];                            
                        });
                        return (amountAdd != 0 && options.value('AmountProfit')!= undefined) ? options.value('AmountProfit') / amountAdd : 0.00;
                    }
                }];
      });
  }
  
  reloadStore()
  {
      let self = this;
      
      this.myStore = new CustomStore({
            load: function (loadOptions) {
                return RestClientService.get("GetMoneyProfitDetailed", self.pivotData)
                .done(function (result) {
                    for (var n in result) {
                        result[n].OnDate = moment(result[n].OnDate).toDate();
                    };
                });        
            }
      });
  }
  
  reloadRangeDataSource()
  {
      let self = this;
      this.rangeDataSource= new DataSource({
        load: function (loadOptions: any) {
            return RestClientService.get('GetMoneyProfitByDays', self.pivotData) //self.myDateRangeSelector.rangeData
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
  
  onCheckBoxValueChanged()
  {
      if (this.checkBox.value == true) {
          this.pivotGrid.instance.option("dataSource.fields[3].area", "column"); 
      }
      else {
          this.pivotGrid.instance.option("dataSource.fields[3].area", "");
      }
  }
  
  contextMenuPreparing(e) {
        var dataSource = e.component.getDataSource(),
            sourceField = e.field;

        if (sourceField) {
            if (!sourceField.groupName || sourceField.groupIndex === 0) {
                e.items.push({
                    text: "Hide field",
                    onItemClick: function () {
                        var fieldIndex;
                        if (sourceField.groupName) {
                            fieldIndex = dataSource.getAreaFields(sourceField.area, true)[sourceField.areaIndex].index;
                        } else {
                            fieldIndex = sourceField.index;
                        }

                        dataSource.field(fieldIndex, {
                            area: null
                        });
                        dataSource.load();
                    }
                });
            }

            if (sourceField.dataType === "number") {
                var setSummaryType = function (args) {
                    dataSource.field(sourceField.index, {
                        summaryType: args.itemData.value
                    });

                    dataSource.load();
                },
                    menuItems = [];

                e.items.push({ text: "Summary Type", items: menuItems });

                for (let summaryType of ["Sum", "Avg", "Min", "Max"]) {
                    var summaryTypeValue = summaryType.toLowerCase();

                    menuItems.push({
                        text: summaryType,
                        value: summaryType.toLowerCase(),
                        onItemClick: setSummaryType,
                        selected: e.field.summaryType === summaryTypeValue
                    });
                };
            }
        }
  }
}
