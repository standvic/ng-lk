import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-stock-unmarketable',
  templateUrl: './stock-unmarketable.component.html',
  styleUrls: ['./stock-unmarketable.component.css']
})
export class StockUnmarketableComponent implements OnInit {
  myStore: any;
  
  fields:any;
  
  constructor(private translate: TranslateService) { }

  ngOnInit() {
      this.InitWithTranslate();
      this.reloadStore();
  }

  InitWithTranslate()
  {
      var needTranslate = [
                'STOCK_UNMARKETABLE_PAGE.GRID.FIELDS.FIELD1',
                'STOCK_UNMARKETABLE_PAGE.GRID.FIELDS.FIELD2',
                'STOCK_UNMARKETABLE_PAGE.GRID.FIELDS.FIELD3',
                'STOCK_UNMARKETABLE_PAGE.GRID.FIELDS.FIELD4',
                'STOCK_UNMARKETABLE_PAGE.GRID.FIELDS.FIELD5'
      ];
      var self = this;
      this.translate.get(needTranslate, null).subscribe((res: string) => {
            self.fields = [{
                    dataField: "GroupName",
                    caption: res['STOCK_UNMARKETABLE_PAGE.GRID.FIELDS.FIELD1'],
                    area: 'column',
                    customizeText: function (e) {
                        return (e.value.split('\t'))[1];
                    },
                    sortingMethod: function (object1, object2) {
                        var index1 = (object1.value.split('\t'))[0];
                        var index2 = (object2.value.split('\t'))[0];
                        if (index1 > index2)
                            return 1;
                        if (index2 > index1)
                            return -1;
                        else
                            return 0;
                    },
                    sortOrder: 'desc',
                    sortBySummaryField: "Amount"
                }, {
                    dataField: "ArticleTypeName",
                    caption: res['STOCK_UNMARKETABLE_PAGE.GRID.FIELDS.FIELD2'],
                    area: "row",
                    width: 100,
                    sortOrder: 'desc',
                    sortBySummaryField: "Amount"
                }, {
                    dataField: "ArticleName",
                    caption: res['STOCK_UNMARKETABLE_PAGE.GRID.FIELDS.FIELD3'],
                    area: "row",
                    width: 100,
                    sortOrder: 'desc',
                    sortBySummaryField: "Amount"
                }, {
                    dataField: 'Quantity',
                    caption: res['STOCK_UNMARKETABLE_PAGE.GRID.FIELDS.FIELD4'],
                    summaryType: 'sum',
                    dataType: 'number',
                    format: {
                        type: 'fixedPoint',
                        precision: 2
                    },
                    area: 'data'
                }, {
                    dataField: 'Amount',
                    caption: res['STOCK_UNMARKETABLE_PAGE.GRID.FIELDS.FIELD5'],
                    summaryType: 'sum',
                    dataType: 'number',
                    format: {
                        type: 'currency',
                        precision: 2
                    },
                    area: 'data'
                }];
      });
  }

  reloadStore()
  {
      let self = this;
      
      this.myStore = new CustomStore({
            load: function (loadOptions) {
                return RestClientService.get("GetStockUnmarketableBalanceDetailed", { })
                    .done(function (result) { });
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
