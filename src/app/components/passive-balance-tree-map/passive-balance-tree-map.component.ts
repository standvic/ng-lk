import {Component, OnInit, ViewChild} from '@angular/core';
import {DxTreeMapComponent} from "devextreme-angular";
import DataSource from 'devextreme/data/data_source';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import {Router} from '@angular/router';
import * as numeral from 'numeral';
import 'numeral/locales/ru';
import * as moment from "moment";
import 'moment/locale/ru';
import * as $ from 'jquery';

@Component({
    selector: 'app-passive-balance-tree-map',
    templateUrl: './passive-balance-tree-map.component.html',
    styleUrls: ['./passive-balance-tree-map.component.css']
})
export class PassiveBalanceTreeMapComponent implements OnInit {

    @ViewChild("passivebalance") passiveBalance: DxTreeMapComponent
    dataSource: any = {};
    
    constructor(private router: Router) {}

    ngOnInit() {
        let self = this;
        this.dataSource = new DataSource({
            load: function (loadOptions) {
                var params = {"IsActive": false};
                return RestClientService.get('GetCurrentBalanceReport',params)
                .done(function (result) {
                            for (var n in result) {
                                if (result[n].GroupName == "Пассивы") {
                                    self.passiveBalance.instance.option("title",{text:"ВСЕГО ПАССИВОВ:   " + 
                                                numeral(result[n].Amount).format('0,0') + " РУБ НА " + 
                                                moment(result[0].ReportDate).format("L") + " " + 
                                                moment(result[0].ReportDate).format("LT"),horizontalAlignment: "left",font:{size: 14}});
                                    result[n].Amount = 0;
                                };
                                if (result[n].GroupName == "Проблемная кредиторская задолженность" || result[n].GroupName == "Нераспределенные убытки") {
                                    result[n].color = "#e55253";
                                }
                            }
                });
            }
        });
    }
    
    onClick(e: any) {
        switch(e.node.data.GroupName) {
            case "Проблемная кредиторская задолженность":
                this.router.navigate(['moneyAccountsPayableWithOverdue']);
                break;
            default:
                break;
        };
    }
    
    customizeTooltip(arg: any) {
        var data = arg.node.data,
            result = null;
            if (arg.node.data.GroupName =="Нераспределенные убытки") {
                result = "<b>" + data.GroupName + "</b> <br/>Сумма: -" + arg.valueText;
            }
            else {
                result = "<b>" + data.GroupName + "</b> <br/>Сумма: " + arg.valueText;
            }
        return {
            text: result
        };
    }

}
