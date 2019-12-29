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
    selector: 'app-gross-profit-chart',
    templateUrl: './gross-profit-chart.component.html',
    styleUrls: ['./gross-profit-chart.component.css']
})
export class GrossProfitChartComponent implements OnInit {
    
    @Input() argumentField: string;
    @Input() argumentAxis: any;
    @Input() palette: string;
    @Input() title: string;
    @Input() dataService: string;
    
    dataSource:any ={}; 
    valueAxis = [{
        name: 'amount',
        position:'left',
        visible: true,
        label: {
            customizeText: function () {
                var labelText;
                labelText = numeral(this.value).format('0.00a');
                return labelText;
            }
        },
        format: 'decimal',
        /*title: {
            text: 'ВАЛОВАЯ ПРИБЫЛЬ, ВЫРУЧКА, РУБ'
        }*/
        }, {
        name: 'percent',
        position: 'right',
        visible: true,
        showZero: true,
        label: {
            format: 'percent'
        },                
        title: {
            text: 'Наценка, %'
        },
        constantLines: [{
            value: 1,
            color: 'orangered',
            width: 1,
            dashStyle: 'dash',
            label: {
                horizontalAlignment: 'right'
            }
        }]
        }];
    
    constructor() {
    }

    ngOnInit() {
        let self = this;
        this.dataSource= new DataSource({
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
    
    customizeTooltip(point: any) {
        var items = ''.split('\n');
        var obj = $('<div>').css('text-align', 'center').css('line-height', '15px').css('margin-bottom', '10px');
        obj.append($('<span>').text(point.seriesName));
        obj.append($('<br />'));
        if (point.seriesName == "НАЦЕНКА, %"){
            obj.append($('<b>').text(numeral(point.valueText).format('(0.00%)')).css('color', point.point.getColor()).css('font-size', '20px').css('font-weight', 'normal'));
        }
        else {
            obj.append($('<b>').text(numeral(point.valueText).format('0.00a')).css('color', point.point.getColor()).css('font-size', '20px').css('font-weight', 'normal'));
        }
        items[0] = obj.prop('outerHTML');   
        return { html: items.join('\n') };
    }
}
