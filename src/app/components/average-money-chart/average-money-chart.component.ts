import {Component, OnInit} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import * as moment from "moment";
import 'moment/locale/ru';
import * as numeral from 'numeral';
import 'numeral/locales/ru';
import * as $ from 'jquery';

@Component({
    selector: 'app-average-money-chart',
    templateUrl: './average-money-chart.component.html',
    styleUrls: ['./average-money-chart.component.css']
})
export class AverageMoneyChartComponent implements OnInit {

    dataAverageMoneyBalanceSource: any;

    constructor() {
        moment.locale('ru');
        numeral.locale('ru');
    }

    ngOnInit() {
        this.dataAverageMoneyBalanceSource = new DataSource({
            load: function (loadOptions: any) {
                return RestClientService.get('GetAverageMoneyBalanceHistory', {})
                    .done(function (result: any) {
                        for (var n in result) {
                            result[n].argName = moment.months(result[n].Month - 1) + ' ' + result[n].Year.toString() + ' г.';
                        }
                    });
            }
        });
    }
    
    averageMoneyBalanceCustomizeTooltip(point: any) {
        var items = ''.split('\n');
        var obj = $('<div>').css('text-align', 'center').css('line-height', '15px').css('margin-bottom', '10px');
        obj.append($('<b>').text(numeral(point.value).format('(0,0.00a)')).css('color', point.point.getColor()).css('font-size', '20px').css('font-weight', 'normal'));
        items[0] = obj.prop('outerHTML');                    
        return { html: items.join('\n') };
    }
    
    customizeText(data: any) {
        var labelText;
        labelText = numeral(data.value).format('0.00a');
        return labelText;
    };
    
    customizeLabel() {
            return {
                visible: true,
                backgroundColor: "#fff",
                font: {
                    color: "#959595"
                },
                customizeText: function () {
                    return numeral(this.valueText).format('0,0.00a');
                }
            };
    }

}
