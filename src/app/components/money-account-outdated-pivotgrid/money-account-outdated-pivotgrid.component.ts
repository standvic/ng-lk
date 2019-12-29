import {Component, OnInit, Input} from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import * as moment from "moment";
import 'moment/locale/ru';

@Component({
    selector: 'app-money-account-outdated-pivotgrid',
    templateUrl: './money-account-outdated-pivotgrid.component.html',
    styleUrls: ['./money-account-outdated-pivotgrid.component.css']
})
export class MoneyAccountOutdatedPivotgridComponent implements OnInit {

    @Input() dataService: string;
    @Input() caption: string;
    myStore: any = {};
    gridDate: Date = new Date();

    constructor() {}

    ngOnInit() {
        let self = this;
        this.myStore = new CustomStore({
            load: function (loadOptions) {
                return RestClientService.get(self.dataService, {
                    Date: moment(this.gridDate).toISOString()
                });
            }
        });
    }
    
    customizeText(e: any) {
        return ((e.value.split('\t'))[1]);
    }
    
    sortingMethod (object1: any, object2: any) {
        var index1 = (object1.value.split('\t'))[0];
        var index2 = (object2.value.split('\t'))[0];
        if (index1 > index2)
            return 1;
        if (index2 > index1)
            return -1;
        else
            return 0;
    }

}
