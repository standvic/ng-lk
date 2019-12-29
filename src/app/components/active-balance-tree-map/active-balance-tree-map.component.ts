import {Component, OnInit, ViewChild} from '@angular/core';
import { DxTreeMapComponent } from "devextreme-angular";
import DataSource from 'devextreme/data/data_source';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import { Router } from '@angular/router';
import * as numeral from 'numeral';
import 'numeral/locales/ru';
import * as moment from "moment";
import 'moment/locale/ru';
import * as $ from 'jquery';

@Component({
    selector: 'app-active-balance-tree-map',
    templateUrl: './active-balance-tree-map.component.html',
    styleUrls: ['./active-balance-tree-map.component.css']
})
export class ActiveBalanceTreeMapComponent implements OnInit {

    @ViewChild("activebalance") activeBalance: DxTreeMapComponent
    dataSource: any = {};
    
    constructor(private router: Router) {}

    ngOnInit() {
        let self = this;
        this.dataSource = new DataSource({
            load: function (loadOptions) {
                var params = {"IsActive": true};
                return RestClientService.get('GetCurrentBalanceReport',params)
                .done(function (result) {
                    for (var n in result) {
                        if (result[n].GroupName == "Активы"){
                            self.activeBalance.instance.option("title",{text:"ВСЕГО АКТИВОВ:   " + 
                                        numeral(result[n].Amount).format('0,0') + " РУБ НА " + 
                                        moment(result[0].ReportDate).format("L") + " " + 
                                        moment(result[0].ReportDate).format("LT"),horizontalAlignment: "left",font:{size: 14}});
                            result[n].Amount = 0;
                        };
                        if (result[n].GroupName == "Неликвидные товары" || result[n].GroupName == "Проблемная дебиторская задолженность" || result[n].GroupName == "Претензионные товары") {
                            result[n].color = "#e55253";
                        }
                    }
                });
            }
        });
    }
    
    onClick(e: any) {
        switch(e.node.data.GroupName) {
            case "Проблемная дебиторская задолженность":
                this.router.navigate(['moneyAccountsReceivableWithOverdue']);
                break;
            case "Неликвидные товары":
                this.router.navigate(['stockUnmarketable']);
                break;
            default:
                break;
        };
    }
    
    customizeTooltip(arg: any) {
        var data = arg.node.data,
            result = null;
            result = "<b>" + data.GroupName + "</b> <br/>Сумма: " + arg.valueText;
        return {
            text: result
        };
    }

}
