import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import * as moment from "moment";
import 'moment/locale/ru';
import * as numeral from 'numeral';
import 'numeral/locales/ru';
import * as $ from 'jquery';
import { DxPivotGridComponent } from "devextreme-angular";

@Component({
    selector: 'app-money-account-pivotgrid',
    templateUrl: './money-account-pivotgrid.component.html',
    styleUrls: ['./money-account-pivotgrid.component.css']
})
export class MoneyAccountPivotgridComponent implements OnInit {

    @Input() dataService: string;
    @Input() caption: string;
    @Input() value: Date;
    @Input() fields: any;
    @Input() showColumnGrandTotals: boolean = true;
    @Output() valueChange = new EventEmitter<Date>();
    @Input() exportEnabled: boolean = false;
    @Input() exportFileName: string;
    myStore: any ={};
        
    @ViewChild("pivotGrid") pivotGrid: DxPivotGridComponent;
    
    constructor() {}

    ngOnInit() {
        if (this.dataService != '' && this.dataService != 'undefined' && this.dataService != null) //на случай если сорс определяется и перегружается на вьюхе
        {
            let self = this;
            this.myStore = new CustomStore({
                load: function (loadOptions) {
                    return RestClientService.get(self.dataService, {
                        Date: moment(self.value).toISOString()
                    });
                }
            });
        }
    }
    
    onDateChange(model: Date){
        this.value = model;
        this.valueChange.emit(model);
        this.ngOnInit();
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
