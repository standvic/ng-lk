import { Component, OnInit, Input } from '@angular/core';
//import {LazyDataSource} from '../../services/lazy-data-source/lazy-data-source.service';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import DataSource from 'devextreme/data/data_source';

@Component({
    selector: 'app-money-grid',
    templateUrl: './money-grid.component.html',
    styleUrls: ['./money-grid.component.css']
})
export class MoneyGridComponent implements OnInit {
    @Input() dataService: string;
    @Input() firstColumnName: string;
    dataSource: any;
    
    constructor() { 
    }

    ngOnInit() {
        let self = this;
        this.dataSource   = new DataSource({
            load: function (loadOptions: any) {
                return RestClientService.get(self.dataService, {});
            }
        });
        this.dataSource.reload();
    }
    
    calculateCellValueRub(data: any) {
        return Math.round(data.Rub);
    }
    calculateCellValueUsd(data: any) {
        return Math.round(data.Usd);
    }
    calculateCellValueEur(data: any) {
        return Math.round(data.Eur);
    }
    calculateCellValueBase(data: any) {
        return Math.round(data.Base);
    }
    customizeValue(data: any) {
        //return data.value;
        return data.valueText.replace('Сумм: ','');
    }

}
