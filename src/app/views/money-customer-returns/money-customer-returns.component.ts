import { Component, OnInit, ViewChild } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DateUtilsService} from '../../services/date-utils/date-utils.service';
import * as moment from "moment";
import 'moment/locale/ru';
import * as $ from 'jquery';
import { RangeSelectorComponent } from '../../components/range-selector/range-selector.component';
import CustomStore from 'devextreme/data/custom_store';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import { DxPivotGridComponent, DxCheckBoxComponent } from "devextreme-angular";
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-money-customer-returns',
  templateUrl: './money-customer-returns.component.html',
  styleUrls: ['./money-customer-returns.component.css']
})
export class MoneyCustomerReturnsComponent implements OnInit {
  nextBtnDisabled: boolean = true;
  
  series: any = {
        argumentField: 'OnDate',
        valueField: 'CurrencyAmount',
        type: 'line',
        color: '#DA5859'
    };
  
  instance = 0;
  isDouble = 0;
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
  
  fields: any;
    
  @ViewChild("dateRangeSelector") myDateRangeSelector: RangeSelectorComponent;
  @ViewChild("pivotGrid") pivotGrid: DxPivotGridComponent;
  @ViewChild("checkBox") checkBox: DxCheckBoxComponent;
  
  leftArrowClick(){
      this.nextBtnDisabled = false;
      
      var newDate = new Date(this.currDate.getFullYear() - 1, this.currDate.getMonth(), this.currDate.getDate());
      this.currDate = newDate;
      this.startScale = DateUtilsService.getYearFirstDay(this.currDate);
      this.endScale = DateUtilsService.getYearLastDay(this.currDate);
      
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
      var startDate = DateUtilsService.getDateOnly(new Date(e.value[0]));
      var endDate = moment(DateUtilsService.getDateOnly(new Date(e.value[1]))).add(1, 'days').add(-1, 'seconds').toISOString();
      this.pivotData.StartDate = startDate;
      this.pivotData.EndDate = moment(endDate).toDate();
      this.reloadStore();
  }

  constructor(private translate: TranslateService) { }

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
                'MONEY_CUSTOMER_RETURNS_PAGE.PIVOT_GRID.COLUMNS.COLUMN1',
                'MONEY_CUSTOMER_RETURNS_PAGE.PIVOT_GRID.ROWS.ROW1',
                'MONEY_CUSTOMER_RETURNS_PAGE.PIVOT_GRID.ROWS.ROW2',
                'MONEY_CUSTOMER_RETURNS_PAGE.PIVOT_GRID.DATAS.DATA1',
                'MONEY_CUSTOMER_RETURNS_PAGE.PIVOT_GRID.DATAS.DATA2'
      ];
      var self = this;
      this.translate.get(needTranslate, null).subscribe((res: string) => {
            self.fields = [{
                    dataField: "CurrencyName",
                    caption: res['MONEY_CUSTOMER_RETURNS_PAGE.PIVOT_GRID.COLUMNS.COLUMN1'],
                    area: "column",
                    sortBySummaryField: "AmountSub"
                },{
                    dataField: "AgentName",
                    caption: res['MONEY_CUSTOMER_RETURNS_PAGE.PIVOT_GRID.ROWS.ROW1'],
                    area: 'row',
                    sortOrder: 'desc',
                    sortBySummaryField: "Amount"
                },{
                    dataField: "BudgetItemName",
                    caption: res['MONEY_CUSTOMER_RETURNS_PAGE.PIVOT_GRID.ROWS.ROW2'],
                    area: "row",
                    width: 500,
                    sortOrder: 'desc',
                    sortBySummaryField: "AmountSub"
                },{
                    dataField: "OnDate",
                    caption: res['MONEY_CUSTOMER_RETURNS_PAGE.PIVOT_GRID.DATAS.DATA1'],
                    dataType: "date",
                    format: "date",
                    area: "",
                    sortBySummaryField: "AmountSub"
                },{
                    dataField: "CurrencyAmount",
                    width: 100,
                    caption: res['MONEY_CUSTOMER_RETURNS_PAGE.PIVOT_GRID.DATAS.DATA2'],
                    dataType: "number",
                    format: {
                        precision:2
                    },
                    summaryType: "sum",
                    area: "data"
                }];
      });
  }
  
  reloadStore()
  {
      let self = this;
      
      this.myStore = new CustomStore({
            load: function (loadOptions) {
                return RestClientService.get("GetMoneyCustomerReturns", self.pivotData)
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
            return RestClientService.get('GetMoneyCustomerReturns', self.pivotData)
                .done(function (result) {  
                	var iIndex = 0;
                	var nValue = 0;
                    for (var n in result) {         
                        if (result[n].OnDate) {
                            result[n].OnDate = moment(result[n].OnDate).toDate();
                            nValue += result[n].CurrencyAmount;   
                            iIndex++;
                        };
                    };
                    var maxDate = DateUtilsService.getMinDate();
                    var minDate = DateUtilsService.getMaxDate();
                    $(result).each(function () {
                        maxDate = (maxDate < this.OnDate ? this.OnDate : maxDate);
                        minDate = (minDate > this.OnDate ? this.OnDate : minDate);
                    });     
                    
                    self.myDateRangeSelector.value = [self.startSelected,self.endSelected];
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
