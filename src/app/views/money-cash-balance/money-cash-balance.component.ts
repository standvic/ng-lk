import { Component, OnInit, ViewChild } from '@angular/core';
import {DateUtilsService} from '../../services/date-utils/date-utils.service';
import * as moment from "moment";
import 'moment/locale/ru';
import * as $ from 'jquery';
import { RangeSelectorComponent } from '../../components/range-selector/range-selector.component';
import CustomStore from 'devextreme/data/custom_store';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import { DxPivotGridComponent, DxCheckBoxComponent, DxPopupComponent } from "devextreme-angular";
import DataSource from 'devextreme/data/data_source';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-money-cash-balance',
  templateUrl: './money-cash-balance.component.html',
  styleUrls: ['./money-cash-balance.component.css']
})
export class MoneyCashBalanceComponent implements OnInit {
  nextBtnDisabled: boolean = true;
  
  instance = 0;
  isDouble = 0;
  currDate = new Date();
  endSelected = new Date();
  startSelected = DateUtilsService.getLastMonthsDay(6);
  endScale = new Date();
  startScale = DateUtilsService.getLastMonthsDay(12);
  popupGridParams:any = {};
  
  series: any = {
        argumentField: 'OnDate',
        valueField: 'Summ',
        type: 'line',
        color: '#DA5859'
    };
  
  rangeDataSource: any;
  
  treeListStore:any;
  
  treeListColumns:any;
  
  myStore:any;
       
  fields: any;
    
  popupGridSource:any;   
  
  dataGridColumns:any;
  
  @ViewChild("dateRangeSelector") myDateRangeSelector: RangeSelectorComponent;
  @ViewChild("checkBox") checkBox: DxCheckBoxComponent;
  @ViewChild("pivotGrid") pivotGrid: DxPivotGridComponent;
  @ViewChild("myPopup") myPopup: DxPopupComponent;
  
  constructor(private translate: TranslateService) { }

  ngOnInit() {
      this.InitWithTranslate();
      this.myDateRangeSelector.rangeData.StartDate = moment(this.startScale).toISOString();
      this.myDateRangeSelector.rangeData.EndDate = moment(this.endScale).toISOString();
      this.reloadRangeDataSource();
  }
  
  InitWithTranslate()
  {
      var needTranslate = [
                'MONEY_CASH_BALANCE_PAGE.TREE_LIST_COLUMNS.COLUMN1',
                'MONEY_CASH_BALANCE_PAGE.TREE_LIST_COLUMNS.COLUMN2',
                'MONEY_CASH_BALANCE_PAGE.TREE_LIST_COLUMNS.COLUMN3',
                'MONEY_CASH_BALANCE_PAGE.TREE_LIST_COLUMNS.COLUMN4',
                'MONEY_CASH_BALANCE_PAGE.TREE_LIST_COLUMNS.COLUMN5',
                
                'MONEY_CASH_BALANCE_PAGE.PIVOT_GRID.ROWS.ROW1',
                'MONEY_CASH_BALANCE_PAGE.PIVOT_GRID.ROWS.ROW2',
                'MONEY_CASH_BALANCE_PAGE.PIVOT_GRID.ROWS.ROW3',
                'MONEY_CASH_BALANCE_PAGE.PIVOT_GRID.COLUMNS.COLUMN1',
                'MONEY_CASH_BALANCE_PAGE.PIVOT_GRID.DATAS.DATA1',
                'MONEY_CASH_BALANCE_PAGE.PIVOT_GRID.DATAS.DATA2',
                
                'MONEY_CASH_BALANCE_PAGE.POPUP_WINDOW.GRID_COLUMNS.COLUMN1',
                'MONEY_CASH_BALANCE_PAGE.POPUP_WINDOW.GRID_COLUMNS.COLUMN2',
                'MONEY_CASH_BALANCE_PAGE.POPUP_WINDOW.GRID_COLUMNS.COLUMN3',
                'MONEY_CASH_BALANCE_PAGE.POPUP_WINDOW.GRID_COLUMNS.COLUMN4',
                'MONEY_CASH_BALANCE_PAGE.POPUP_WINDOW.GRID_COLUMNS.COLUMN5'
            ];
      var self = this;
      this.translate.get(needTranslate, null).subscribe((res: string) => {
            self.treeListColumns = [{
                dataField: "Name",
                caption: res['MONEY_CASH_BALANCE_PAGE.TREE_LIST_COLUMNS.COLUMN1'],
                },{
                dataField: "AmountRealIn",
                caption: res['MONEY_CASH_BALANCE_PAGE.TREE_LIST_COLUMNS.COLUMN2'],
                format: {
                        precision:0,
                        type: 'fixedPoint'
                    }
                },{
                dataField: "AmountAdd",
                caption: res['MONEY_CASH_BALANCE_PAGE.TREE_LIST_COLUMNS.COLUMN3'],
                format: {
                        precision:0,
                        type: 'fixedPoint'
                    }
                },{
                dataField: "AmountSub",
                caption: res['MONEY_CASH_BALANCE_PAGE.TREE_LIST_COLUMNS.COLUMN4'],
                format: {
                        precision:0,
                        type: 'fixedPoint'
                    }
                },{
                dataField: "AmountRealOut",
                caption: res['MONEY_CASH_BALANCE_PAGE.TREE_LIST_COLUMNS.COLUMN5'],
                format: {
                        precision:0,
                        type: 'fixedPoint'
                    }
                }];
                
            self.fields = [{
                dataField: "GroupName",
                caption: res['MONEY_CASH_BALANCE_PAGE.PIVOT_GRID.ROWS.ROW1'],
                area: 'row',
                sortOrder: 'desc',
                sortBySummaryField: "Amount"
            }, {
                dataField: "CostItemName",
                caption: res['MONEY_CASH_BALANCE_PAGE.PIVOT_GRID.ROWS.ROW2'],
                area: "row",
                sortOrder: 'desc',
                sortBySummaryField: "AmountSub"
            }, {
                dataField: "Type",
                caption: res['MONEY_CASH_BALANCE_PAGE.PIVOT_GRID.ROWS.ROW3'],
                area: "row",
                sortOrder: 'desc',
                sortBySummaryField: "AmountSub"
            }, {
                dataField: "CurrencyName",
                caption: res['MONEY_CASH_BALANCE_PAGE.PIVOT_GRID.COLUMNS.COLUMN1'],
                area: "column",
                sortBySummaryField: "AmountSub"
            }, {
                dataField: "OnDate",
                caption: res['MONEY_CASH_BALANCE_PAGE.PIVOT_GRID.DATAS.DATA1'],
                dataType: "date",
                format: "date",
                area: "",
                sortBySummaryField: "AmountSub"
            }, {
                dataField: "Summ",
                width: 100,
                caption: res['MONEY_CASH_BALANCE_PAGE.PIVOT_GRID.DATAS.DATA2'],
                dataType: "number",
                format: {
                    precision: 0,
                    type: 'fixedPoint'
                },
                summaryType: "sum",
                area: "data"
            }];
            
            self.dataGridColumns = [{
                            dataField: 'OnDate',
                            caption: res['MONEY_CASH_BALANCE_PAGE.POPUP_WINDOW.GRID_COLUMNS.COLUMN1'],
                            dataType: 'date',
                            customizeText: function (options) {
                                return !options.value ? "" : moment(options.value).format("L");
                            }
                            },{
                                dataField: 'DocumentId',
                                caption: res['MONEY_CASH_BALANCE_PAGE.POPUP_WINDOW.GRID_COLUMNS.COLUMN2']
                            },{
                                dataField: 'DocumentName',
                                caption: res['MONEY_CASH_BALANCE_PAGE.POPUP_WINDOW.GRID_COLUMNS.COLUMN3'],
                                width:"66%"
                            },{
                                dataField: 'Summ',
                                caption: res['MONEY_CASH_BALANCE_PAGE.POPUP_WINDOW.GRID_COLUMNS.COLUMN4'],
                                format: {
                                    precision:0,
                                    type: 'fixedPoint'
                                }
                            },{
                                dataField: 'CurrencyName',
                                caption: res['MONEY_CASH_BALANCE_PAGE.POPUP_WINDOW.GRID_COLUMNS.COLUMN5']
                        }];
      });
  }
  
  leftArrowClick(){
      this.nextBtnDisabled = false;
      
      var newDate = new Date(this.currDate.getFullYear() - 1, this.currDate.getMonth(), this.currDate.getDate());
      this.currDate = newDate;
      this.startScale = DateUtilsService.getYearFirstDay(this.currDate);
      this.endScale = DateUtilsService.getYearLastDay(this.currDate);
      this.myDateRangeSelector.rangeData.StartDate = moment(this.startScale).toISOString();
      this.myDateRangeSelector.rangeData.EndDate = moment(this.endScale).toISOString();
      
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
      this.myDateRangeSelector.rangeData.StartDate = moment(this.startScale).toISOString();
      this.myDateRangeSelector.rangeData.EndDate = moment(this.endScale).toISOString();

      var firstDayNextYear = DateUtilsService.getYearFirstDay(this.currDate);
      firstDayNextYear.setMonth(firstDayNextYear.getMonth() + 6);
      this.startSelected = DateUtilsService.getYearFirstDay(this.currDate);
      this.endSelected = firstDayNextYear; 
      this.reloadRangeDataSource();
  }

  onRangeChanged(e)
  {
      var startDate = moment(DateUtilsService.getDateOnly(new Date(e.value[0]))).toISOString();
      var endDate = moment(DateUtilsService.getDateOnly(new Date(e.value[1]))).add(1, 'days').add(-1, 'seconds').toISOString();
      this.myDateRangeSelector.rangeData.StartDate = startDate;
      this.myDateRangeSelector.rangeData.EndDate = endDate;
      this.reloadPivotDataSource();
      this.reloadTreeListStore();
  }
  
  reloadRangeDataSource()
  {
      let self = this;
      this.rangeDataSource= new DataSource({
        load: function (loadOptions: any) {
            return RestClientService.get('GetMoneyCashBalance', self.myDateRangeSelector.rangeData)
                .done(function (result) {
                    var iIndex = 0;
                    var nValue = 0;
                    for (var n in result) {         
                        result[n].OnDate = moment(result[n].OnDate).toDate();
                        result[n].Summ = result[n].AmountAdd - result[n].AmountSub;
                        nValue += result[n].AmountAdd + result[n].AmountSub;   
                        iIndex++;
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
  
  reloadTreeListStore()
  {
      var self = this;
      this.treeListStore = new DataSource({
        load: function (loadOptions) {
            return RestClientService.get("GetMoneyCashFlowSummary", self.myDateRangeSelector.rangeData)
                .done(function (result) {});        
        }
    });
  }
  
  reloadPivotDataSource()
  {
      var self = this;
      this.myStore = new CustomStore({
        load: function (loadOptions) {
            return RestClientService.get("GetMoneyCashFlow", self.myDateRangeSelector.rangeData)
                .done(function (result) {
                    for (var n in result) {
                        result[n].OnDate = moment(result[n].OnDate).toDate();
                        result[n].Summ = result[n].CurrencyAmountAdd - result[n].CurrencyAmountSub;
                    };
                });        
        }
    });
  }
  
  reloadPopupGridSource()
  {
      var self = this;
      this.popupGridSource = new DataSource({
        load: function (loadOptions) {
            return RestClientService.get("GetMoneyCashFlowDocuments",self.popupGridParams)
            .done(function (result) {
                for (var n in result) {
                    result[n].OnDate = moment(result[n].OnDate).toDate();
                    result[n].Summ = result[n].AmountAdd - result[n].AmountSub;
                };
            });
        }        
    });
  }
  
  onCheckBoxValueChanged()
  {
      if (this.checkBox.value == true) {
          this.pivotGrid.instance.option("dataSource.fields[4].area", "column"); 
      }
      else {
          this.pivotGrid.instance.option("dataSource.fields[4].area", "");
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
  
  cellClick(e){
      if (e.area == "data" && e.cell.columnPath[0] && e.cell.rowPath[1]) {
          var startDate = null, endDate = null;
          if (e.cell.columnPath[1]) {
              if (e.cell.columnPath[2]) {
                  if (e.cell.columnPath[3]) { // year, month
                      startDate = new Date(e.cell.columnPath[1], e.cell.columnPath[3] - 1, 1);
                      endDate = new Date(e.cell.columnPath[1], e.cell.columnPath[3], 0);
                  }
                  else {  // year, qart
                      switch (e.cell.columnPath[2]) {
                          case 1:
                              startDate = new Date(e.cell.columnPath[1], 0, 1);
                              endDate = new Date(e.cell.columnPath[1], 3, 0);
                              break;
                          case 2:
                              startDate = new Date(e.cell.columnPath[1], 3, 1);
                              endDate = new Date(e.cell.columnPath[1], 6, 0);
                              break;
                          case 3:
                              startDate = new Date(e.cell.columnPath[1], 6, 1);
                              endDate = new Date(e.cell.columnPath[1], 9, 0);
                              break;
                          case 4:
                              startDate = new Date(e.cell.columnPath[1], 9, 1);
                              endDate = new Date(e.cell.columnPath[1], 11, 31);
                              break;
                      }
                  }
              }
              else {  // year
                  startDate = new Date(e.cell.columnPath[1], 0, 1);
                  endDate = new Date(e.cell.columnPath[1], 11, 31);
              }
          };
          this.popupGridParams = {
              StartDate: startDate != null ? startDate : this.myDateRangeSelector.rangeData.StartDate,
              EndDate: endDate != null ? endDate : this.myDateRangeSelector.rangeData.EndDate,
              CurrencyCode: e.cell.columnPath[0],
              CostItemName: e.cell.rowPath[1]
          };
          
          this.myPopup.instance.show();
          this.reloadPopupGridSource();
      }
    };
}
