import { Component, OnInit, ViewChild } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DateUtilsService} from '../../services/date-utils/date-utils.service';
import * as numeral from 'numeral';
import 'numeral/locales/ru';
import * as moment from "moment";
import 'moment/locale/ru';
import * as $ from 'jquery';
import { RangeSelectorComponent } from '../../components/range-selector/range-selector.component';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-net-profit',
  templateUrl: './net-profit.component.html',
  styleUrls: ['./net-profit.component.css']
})
export class NetProfitComponent implements OnInit {
  nextBtnDisabled: boolean = true;
  rangeDataSource: any;
  series: any = {
        argumentField: 'OnDate',
        valueField: 'AmountSub',
        type: 'line',
        color: '#DA5859'
    };
  rangeData:any = {
        'Type': 'year',
        'StartDate': moment(DateUtilsService.getYearFirstDay(new Date())).toISOString(),
        'EndDate': moment(DateUtilsService.getYearLastDay(new Date())).toISOString()
    };
  gridSource:any;
  gridColumns:any;
  groupCellTemplate = function (groupCell, info) {
        var obj = $('<div>');
        if (!info.row.data.items[0].Selected)
        {
            obj.append($('<div>').text(info.text).css('font-weight', 'normal').css('font-style', 'normal').css('position', 'absolute').css('left', '10px').css('float', 'left'));
            obj.append($('<div>').text(numeral(info.row.data.items[0].Amount).format('0,0.00')).css('font-weight', 'normal').css('font-style', 'normal').css('float', 'right').css('display', 'inline-block'));
        }
        else
        {
            obj.append($('<div>').text(info.text).css('font-style', 'bold').css('position', 'absolute').css('left', '10px').css('float', 'left'));
            obj.append($('<div>').text(numeral(info.row.data.items[0].Amount).format('0,0.00')).css('font-style', 'bold').css('float', 'right').css('display', 'inline-block'));
        }
        obj.appendTo(groupCell);
    };
            
  customizeGridColumns:any;
    
  @ViewChild("dateRangeSelector") myDateRangeSelector: RangeSelectorComponent;
    
  constructor(private translate: TranslateService) { }

  ngOnInit() {
      this.InitWithTranslate();
      DateUtilsService.getNextPeriod('', this.myDateRangeSelector.rangeData);
      this.reloadRangeDataSource();
      this.reloadGridSource();
      
      var self = this;
      this.customizeGridColumns = function (columns) {
                $.each(columns, function (_, element) {
                    element.groupCellTemplate = self.groupCellTemplate;
                });
            };
  }
  
  InitWithTranslate()
  {
      var needTranslate = [
                'NET_PROFIT_PAGE.GRID.COLUMNS.COLUMN1',
                'NET_PROFIT_PAGE.GRID.COLUMNS.COLUMN2'
            ];
      var self = this;
      this.translate.get(needTranslate, null).subscribe((res: string) => {
          self.gridColumns = [{
                dataField: "GroupID",
                caption: "",
                groupIndex: 0
            }, {
                dataField: "GroupName",
                caption: res['NET_PROFIT_PAGE.GRID.COLUMNS.COLUMN1'],
                groupIndex: 1
            }, {
                dataField: "CostItemName",
                caption: ""
            }, {
                dataField: "Amount",
                caption: res['NET_PROFIT_PAGE.GRID.COLUMNS.COLUMN2'],
                alignment: "right",
                format: {
                    style: 'decimal'
                },
                calculateCellValue: function (data) {
                    return Math.round(data.Amount);
                }   
            }];
      });
  }
  
  reloadRangeDataSource()
  {
      let self = this;
      this.rangeDataSource= new DataSource({
        load: function (loadOptions: any) {
            return RestClientService.get('GetMoneyProfitByDays', self.myDateRangeSelector.rangeData)
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
                    var dayDiff = moment(maxDate).diff(moment(minDate), 'days');
                    var ssv = dayDiff < 30 ? minDate : new Date(maxDate.getTime() - (1000 * 60 * 60 * 24 * 30));
                    var sev = dayDiff < 30 ? maxDate : maxDate;
                    
                    self.myDateRangeSelector.value = [ssv, sev];
                });
        }
    });
  }
  
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
      
      this.rangeData.StartDate = startDate;
      this.rangeData.EndDate = endDate;
      
      this.reloadGridSource();
  }
  
  reloadGridSource()
  {
      var self = this;
      this.gridSource = new DataSource({
        load: function (loadOptions) {
            return RestClientService.get("GetMoneyNetProfit", self.rangeData);
        }
    });
  }
  
  onGridRowPrepared(e)
  {
      if (e.rowType == 'group' && e.groupIndex == 0) {
          $(e.rowElement).hide();
      }
      if (e.rowType == 'data' && e.key.CostItemName == '') {
          $(e.rowElement).hide();
      }
  }
}
