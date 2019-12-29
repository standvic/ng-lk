import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-money-balance',
  templateUrl: './money-balance.component.html',
  styleUrls: ['./money-balance.component.css']
})
export class MoneyBalanceComponent implements OnInit {
  gridDate: Date = new Date();
  
  fields:any;
  
  constructor(private translate: TranslateService) { }

  ngOnInit() {
      this.InitWithTranslate();
  }
  
  InitWithTranslate()
  {
      var needTranslate = [
                'MONEY_BALANCE_PAGE.PIVOT_GRID.ROWS.ROW1',
                'MONEY_BALANCE_PAGE.PIVOT_GRID.ROWS.ROW2',
                'MONEY_BALANCE_PAGE.PIVOT_GRID.DATAS.DATA1',
                'MONEY_BALANCE_PAGE.PIVOT_GRID.COLUMNS.COLUMN1'
      ];
      var self = this;
      this.translate.get(needTranslate, null).subscribe((res: string) => {
            self.fields = [{
                    dataField: "FirmName",
                    caption: res['MONEY_BALANCE_PAGE.PIVOT_GRID.ROWS.ROW1'],
                    area: "row",
                    width: 100,
                    sortBySummaryField: "FirmName"
                }, {
                    dataField: "BankName",
                    caption: res['MONEY_BALANCE_PAGE.PIVOT_GRID.ROWS.ROW2'],                    
                    area: "row",
                    width: 100,
                    sortBySummaryField: "BankName"
                }, {
                    dataField: "Amount",
                    caption: res['MONEY_BALANCE_PAGE.PIVOT_GRID.DATAS.DATA1'],
                    dataType: "number",
                    summaryType: "sum",
                    format: {
                        precision:2,
                        type: 'fixedPoint'
                    },
                    //format: "currency",
                    //precision: 2,
                    area: "data"
                }, {
                    dataField: "CurrencyName",
                    caption: res['MONEY_BALANCE_PAGE.PIVOT_GRID.COLUMNS.COLUMN1'],
                    //sortOrder: 'desc',
                    area: "column",
                    sortBySummaryField: "Amount"
                }];
      });
  }
  
}
