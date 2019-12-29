import { Component, OnInit, ViewChild } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import * as moment from "moment";
import 'moment/locale/ru';
import * as $ from 'jquery';
import { MoneyAccountPivotgridComponent } from '../../components/money-account-pivotgrid/money-account-pivotgrid.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-stock-balance',
  templateUrl: './stock-balance.component.html',
  styleUrls: ['./stock-balance.component.css']
})
export class StockBalanceComponent implements OnInit {
  gridDate: Date = new Date();
  
  fields:any;
          
  @ViewChild("MoneyAccountPivotgrid") pivotGrid: MoneyAccountPivotgridComponent;
                      
  constructor(private translate: TranslateService) { }

  ngOnInit() {
      this.InitWithTranslate();
      this.reloadGridDataSource();
  }
  
  InitWithTranslate()
  {
      var needTranslate = [
                'STOCK_BALANCE_PAGE.GRID.FIELDS.FIELD1',
                'STOCK_BALANCE_PAGE.GRID.FIELDS.FIELD2',
                'STOCK_BALANCE_PAGE.GRID.FIELDS.FIELD3',
                'STOCK_BALANCE_PAGE.GRID.FIELDS.FIELD4',
                'STOCK_BALANCE_PAGE.GRID.FIELDS.FIELD5'
            ];
      var self = this;
      this.translate.get(needTranslate, null).subscribe((res: string) => {
            self.fields = [{
                    dataField: 'GroupName',
                    caption: res['STOCK_BALANCE_PAGE.GRID.FIELDS.FIELD1'],
                    area: 'row',
                    width: 100,
                    sortOrder: 'desc',
                    sortBySummaryField: 'Amount'
                }, {
                    dataField: 'ArticleName',
                    caption: res['STOCK_BALANCE_PAGE.GRID.FIELDS.FIELD2'],
                    area: 'row',
                    width: 100,
                    sortOrder: 'desc',
                    sortBySummaryField: 'Amount'
                }, {
                    dataField: 'StockName',
                    caption: res['STOCK_BALANCE_PAGE.GRID.FIELDS.FIELD3'],
                    area: 'row',
                    width: 100,
                    sortOrder: 'desc',
                    sortBySummaryField: 'Amount'
                }, {
                    dataField: 'Quantity',
                    caption: res['STOCK_BALANCE_PAGE.GRID.FIELDS.FIELD4'],
                    summaryType: 'sum',
                    dataType: 'number',
                    format: {
                        type: 'fixedPoint',
                        precision: 2
                    },
                    area: 'data'
                }, {
                    dataField: 'Amount',
                    caption: res['STOCK_BALANCE_PAGE.GRID.FIELDS.FIELD5'],
                    summaryType: 'sum',
                    dataType: 'number',
                    format: {
                        type: 'currency',
                        currency: 'RUB',
                        precision: 2
                    },
                    area: 'data'
                }];
      });
  }
  
  reloadGridDataSource()
  {
      let self = this;
      
      this.pivotGrid.myStore = new CustomStore({
            load: function (loadOptions) {
                return RestClientService.get('GetStockBalanceDetailed', {OnDate: moment(self.pivotGrid.value).toISOString() })
                .done(function (result) { });        
            }
      });
  }
  
  onDateChange(date:Date)
  {
      this.reloadGridDataSource();
  }
}
