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
import { DxPivotGridComponent } from "devextreme-angular";
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-money-agent-turnover',
  templateUrl: './money-agent-turnover.component.html',
  styleUrls: ['./money-agent-turnover.component.css']
})
export class MoneyAgentTurnoverComponent implements OnInit {
  nextBtnDisabled: boolean = true;
  
  series:any = {
      argumentField: 'OnDate',
      valueField: 'AmountAdd',
      type: 'line',
      color: '#DA5859'
  };
  
  pivotData = {
        'StartDate': moment(DateUtilsService.getYearFirstDay(new Date())).toISOString(),
        'EndDate': moment(DateUtilsService.getYearLastDay(new Date())).toISOString()
    };
  
  rangeDataSource: any;
    
  myStore: any;
  
  //Тип контрагента       MONEY_AGENT_TURNOVER_PAGE.PIVOT_GRID.ROWS.ROW1
  //Контрагент            MONEY_AGENT_TURNOVER_PAGE.PIVOT_GRID.ROWS.ROW2
  //Статья затрат         MONEY_AGENT_TURNOVER_PAGE.PIVOT_GRID.ROWS.ROW3
  //Компания              MONEY_AGENT_TURNOVER_PAGE.PIVOT_GRID.ROWS.ROW4
  //Банк                  MONEY_AGENT_TURNOVER_PAGE.PIVOT_GRID.ROWS.ROW5
  //Поступления           MONEY_AGENT_TURNOVER_PAGE.PIVOT_GRID.DATAS.DATA1
  //Выбытия               MONEY_AGENT_TURNOVER_PAGE.PIVOT_GRID.DATAS.DATA2
  
  fields:any;
    
  @ViewChild("dateRangeSelector") myDateRangeSelector: RangeSelectorComponent;
  @ViewChild("amountSubTurnover") amountSubDoughnut: DoughnutComponent;
  @ViewChild("amountAddTurnover") amountAddDoughnut: DoughnutComponent;
  @ViewChild("pivotGrid") pivotGrid: DxPivotGridComponent;
  
  leftArrowClick(){
      this.nextBtnDisabled = false;
      this.myDateRangeSelector.moveToPrevPeriod();
  }
  
  rightArrowClick(){
      this.myDateRangeSelector.moveToNextPeriod();
  }

  onRangeChanged(e)
  {
      var startDate = moment(DateUtilsService.getDateOnly(new Date(e.value[0]))).toISOString();
      var endDate = moment(DateUtilsService.getDateOnly(new Date(e.value[1]))).add(1, 'days').add(-1, 'seconds').toISOString();
      
      this.amountSubDoughnut.moveToPeriod(startDate, endDate);
      this.amountAddDoughnut.moveToPeriod(startDate, endDate);
      
      this.pivotData.StartDate = startDate;
      this.pivotData.EndDate = endDate;
      
      this.reloadStore();
  }

  constructor(private translate: TranslateService) { }

  ngOnInit() {
      this.InitWithTranslate();
      this.reloadRangeDataSource();
      this.reloadStore();
  }
  
  InitWithTranslate()
  {
      var needTranslate = [
                'MONEY_AGENT_TURNOVER_PAGE.PIVOT_GRID.ROWS.ROW1',
                'MONEY_AGENT_TURNOVER_PAGE.PIVOT_GRID.ROWS.ROW2',
                'MONEY_AGENT_TURNOVER_PAGE.PIVOT_GRID.ROWS.ROW3',
                'MONEY_AGENT_TURNOVER_PAGE.PIVOT_GRID.ROWS.ROW4',
                'MONEY_AGENT_TURNOVER_PAGE.PIVOT_GRID.ROWS.ROW5',
                'MONEY_AGENT_TURNOVER_PAGE.PIVOT_GRID.DATAS.DATA1',
                'MONEY_AGENT_TURNOVER_PAGE.PIVOT_GRID.DATAS.DATA2'
        ];
      var self = this;
      this.translate.get(needTranslate, null).subscribe((res: string) => {
            self.fields = [{
                    dataField: "AgentTypeName",
                    caption: res['MONEY_AGENT_TURNOVER_PAGE.PIVOT_GRID.ROWS.ROW1'],
                    area: "row",
                    sortOrder: 'desc',
                    sortBySummaryField: "AmountAdd"
                }, {
                    dataField: "AgentName",
                    caption: res['MONEY_AGENT_TURNOVER_PAGE.PIVOT_GRID.ROWS.ROW2'],
                    area: "row",
                    sortOrder: 'desc',
                    sortBySummaryField: "AmountAdd"
                }, {
                    dataField: "CostItemName",
                    caption: res['MONEY_AGENT_TURNOVER_PAGE.PIVOT_GRID.ROWS.ROW3'],
                    area: "row",
                    sortOrder: 'desc',
                    sortBySummaryField: "AmountAdd"
                }, {
                    dataField: "FirmName",
                    caption: res['MONEY_AGENT_TURNOVER_PAGE.PIVOT_GRID.ROWS.ROW4'],
                    area: "row",
                    sortOrder: 'desc',
                    sortBySummaryField: "AmountAdd"
                }, {
                    dataField: "BankName",
                    caption: res['MONEY_AGENT_TURNOVER_PAGE.PIVOT_GRID.ROWS.ROW5'],                    
                    area: "row",
                    sortOrder: 'desc',
                    sortBySummaryField: "AmountAdd"
                }, {
                    dataField: "AmountAdd",
                    width: 100,
                    caption: res['MONEY_AGENT_TURNOVER_PAGE.PIVOT_GRID.DATAS.DATA1'],
                    dataType: "number",
                    summaryType: "sum",
                    format: "currency",
                    precision: 2,
                    area: "data"
                }, {
                    dataField: "AmountSub",
                    width: 100,
                    caption: res['MONEY_AGENT_TURNOVER_PAGE.PIVOT_GRID.DATAS.DATA2'],
                    dataType: "number",
                    format: "currency",
                    summaryType: "sum",
                    precision: 2,
                    area: "data"
                }];
      });
  }
  
  reloadStore()
  {
      let self = this;
      
      this.myStore = new CustomStore({
            load: function (loadOptions) {
                return RestClientService.get("GetMoneyAgentTurnoverDetailed", self.pivotData)
                .done(function (result) {
                    for (var n in result) {
                        result[n].Date = moment(result[n].Date).toDate();
                    };
                })    
            }
      });
  }
  
  reloadRangeDataSource()
  {
      let self = this;
      this.rangeDataSource= new DataSource({
        load: function (loadOptions: any) {
            return RestClientService.get('GetMoneyAgentTurnoverByDays', self.myDateRangeSelector.rangeData)
                .done(function (result) {
                    for (var n in result) {
                        result[n].OnDate = moment(result[n].OnDate).toDate();
                    };
                    var maxDate: Date = DateUtilsService.getMinDate();
                    var minDate: Date = DateUtilsService.getMaxDate();
                    $(result).each(function () {
                        maxDate = (maxDate < this.OnDate ? this.OnDate : maxDate);
                        minDate = (minDate > this.OnDate ? this.OnDate : minDate);
                    });
                    var dayDiff = moment(maxDate).diff(moment(minDate), 'days');
                    
                    var ssd = dayDiff < 30 ? minDate : new Date(maxDate.getTime() - (1000 * 60 * 60 * 24 * 30));
                    var esd = dayDiff < 30 ? maxDate : DateUtilsService.getMonthLastDay(maxDate);
                    
                    self.myDateRangeSelector.rangeSelector.value = [ssd, esd];
                });
        }
    });
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
