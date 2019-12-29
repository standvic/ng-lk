import {Component, OnInit} from '@angular/core';
import {Router}      from '@angular/router';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import DataSource from 'devextreme/data/data_source';
import * as numeral from 'numeral';
import 'numeral/locales/ru';

@Component({
    selector: 'app-average-oper-cash-flow-treelist',
    templateUrl: './average-oper-cash-flow-treelist.component.html',
    styleUrls: ['./average-oper-cash-flow-treelist.component.css']
})
export class AverageOperCashFlowTreelistComponent implements OnInit {

    dataAverageOperationalSource: any;
    
    constructor(private router: Router) {}

    ngOnInit() {
        this.dataAverageOperationalSource = new DataSource({
            load: function (loadOptions: any) {
                return RestClientService.get('GetAverageOperationalCashFlow', {});
            }
        });
    }
    
    calculateCellValueAvgAmount(data: any) {
        return numeral(data.AvgAmount).format('0,0.00a');
        //return Math.round(data.AvgAmount/1000);
    }
    
    onRowPrepared(e: any) {
        if (e.values && e.values[0] == "Возможны внеплановые платежи по погашению проблемной кредиторской задолженности"){
            e.rowElement.style.color = "#ff0000";
        };
        if (e.values && e.values[0] == "Итого" && e.values[1].indexOf('-') == 0){
            e.rowElement.cells[1].style.color = "#ff0000";
        }
    }
    onCellPrepared(e: any) {
        if (e.value == "Возможны внеплановые платежи по погашению проблемной кредиторской задолженности"){
            e.cellElement.style.cursor = "pointer";
            e.cellElement.style.textDecoration = "underline ";
        };
    }
    onCellClick(e: any) {
        if(e.value == "Возможны внеплановые платежи по погашению проблемной кредиторской задолженности"){
            this.router.navigate(['main']);
        }
    }

}
