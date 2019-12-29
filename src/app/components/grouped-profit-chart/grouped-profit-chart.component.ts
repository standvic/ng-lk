import {Component, OnInit, Input} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import {DateUtilsService} from '../../services/date-utils/date-utils.service';
import * as numeral from 'numeral';
import 'numeral/locales/ru';
import * as moment from "moment";
import 'moment/locale/ru';
import * as $ from 'jquery';

@Component({
    selector: 'app-grouped-profit-chart',
    templateUrl: './grouped-profit-chart.component.html',
    styleUrls: ['./grouped-profit-chart.component.css']
})
export class GroupedProfitChartComponent implements OnInit {

    @Input() argumentField: string;
    @Input() argumentAxis: any;
    @Input() palette: string;
    @Input() title: string;
    @Input() dataService: string;

    dataSource: any = {};

    constructor() {}

    ngOnInit() {
        let self = this;
        this.dataSource = new DataSource({
            load: function (loadOptions) {
                var d = new Date();
                d.setMonth(d.getMonth() - 1);
                return RestClientService.get(self.dataService, {StartDate:DateUtilsService.getMonthFirstDay(DateUtilsService.getLastMonthsDay(12)), EndDate:DateUtilsService.getMonthLastDay(d)})
                    .done(function (result) {
                        for (var n in result) {
                            result[n][self.argumentField] = moment(result[n][self.argumentField]).toDate();
                        }
                    });
            }
        });
    }

    customizeText (arg: any) {
        var labelText;
        labelText = numeral(arg.value).format('0.00a');
        return labelText;
    }

    customizeTooltip(arg: any) {
        var items = ''.split('\n');
        var obj = $('<div>').css('text-align', 'center').css('line-height', '15px').css('margin-bottom', '10px');
        obj.append($('<span>').text(arg.seriesName));
        obj.append($('<br />'));
        if (arg.seriesName == "Рентабельность продаж по чистой прибыли") {
            obj.append($('<b>').text(numeral(arg.valueText).format('0.00%')).css('color', arg.point.getColor()).css('font-size', '20px').css('font-weight', 'normal'));
        }
        else {
            obj.append($('<b>').text(numeral(arg.valueText).format('0.00a')).css('color', arg.point.getColor()).css('font-size', '20px').css('font-weight', 'normal'));
        }
        items[0] = obj.prop('outerHTML');
        return {html: items.join('\n')};
    }

}
