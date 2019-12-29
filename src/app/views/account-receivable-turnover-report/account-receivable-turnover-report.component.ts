import {Component, OnInit} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import {DateUtilsService} from '../../services/date-utils/date-utils.service';
import * as moment from "moment";
import 'moment/locale/ru';
import * as numeral from 'numeral';
import 'numeral/locales/ru';
import * as $ from 'jquery';

@Component({
    selector: 'app-account-receivable-turnover-report',
    templateUrl: './account-receivable-turnover-report.component.html',
    styleUrls: ['./account-receivable-turnover-report.component.css']
})
export class AccountReceivableTurnoverReportComponent implements OnInit {

    chartTurnoverDataSource: any;

    constructor() {
        moment.locale('ru');
        numeral.locale('ru');
    }

    ngOnInit() {
        let self = this;
        this.chartTurnoverDataSource = new DataSource({
            load: function (loadOptions) {
                let chartDelivery = {'StartDate': DateUtilsService.getLastMonthsDay(6), 'EndDate': new Date(), 'TurnoverDays': 180};
                return RestClientService.get("GetAccountReceivableTurnoverTrendReport", chartDelivery)
                    .done(function (result: any) {
                        for (var n in result) {
                            result[n].TransactionDate = moment(result[n].TransactionDate).toDate();
                        };
                    });
            }
        });
    }
    
    customizeTooltip(arg: any) {
        var points = arg.points,
                    items = arg.valueText.split('\n');
                    $.each(points, function (index: any, point: any) {                        
                        var seriesName = (point.seriesName.split(','))[0];
                        var valueText = numeral(point.value).format('0.00') + ' дней';
                        var obj = $('<div>').css('text-align', 'center').css('line-height', '15px').css('margin-bottom', '10px');
                        obj.append($('<span>').text(seriesName));
                        obj.append($('<br />'));
                        obj.append($('<b>').text(valueText).css('color', point.point.getColor()).css('font-size', '15px').css('font-weight', 'normal'));
                        items[index] = obj.prop('outerHTML');
                    });
                    return { html: items.join('\n') };
    }
}
