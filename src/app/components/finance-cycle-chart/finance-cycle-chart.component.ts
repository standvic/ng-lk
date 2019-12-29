import {Component, OnInit, ViewChild} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import {DateUtilsService} from '../../services/date-utils/date-utils.service';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import * as numeral from 'numeral';
import 'numeral/locales/ru';
import * as moment from "moment";
import 'moment/locale/ru';
import * as $ from 'jquery';

@Component({
    selector: 'app-finance-cycle-chart',
    templateUrl: './finance-cycle-chart.component.html',
    styleUrls: ['./finance-cycle-chart.component.css']
})
export class FinanceCycleChartComponent implements OnInit {

    ins: any;
    //self: any;
    constCycle: any;//string = '';
    maxval: any;//number = 0;
    minval: any;//number = 0;
    endSelected: any = new Date();
    startSelected: any = DateUtilsService.getLastMonthsDay(6);
    chartData: any = {
        'StartDate': this.startSelected,
        'EndDate': this.endSelected
    };
    chartFinDataSource: any = {};

    constructor() {
    }

    ngOnInit() {
        let self = this;
        this.chartFinDataSource = new DataSource({
        load: function (loadOptions: any) {
            let chartFinData = {StartDate: null, EndDate: null, Period: 0};
            Object.assign(chartFinData,self.chartData);
            chartFinData.StartDate = new Date();
            chartFinData.EndDate = new Date();
            chartFinData.Period = 180;
            return RestClientService.get('GetFinancialCycle', chartFinData)
                .done(function (result: any) {
                    self.maxval = result[0].Value;
                    self.minval = result[0].Value;
                    let summ: number = 0;
                    for (var i in result){
                        if (self.maxval < result[i].Value)
                            self.maxval = result[i].Value;
                        if (self.minval > result[i].Value)
                            self.minval = result[i].Value;
                        summ += result[i].Value;    
                    };
                    self.constCycle = summ.toFixed(2);
                });
            }
        });
    }

    finCycleCustomizeTooltip(arg: any){
        var points = arg.points,
        items = arg.valueText.split('\n');
        $.each(points, function (index: any, point: any) {                        
            var seriesName = (point.seriesName.split(','))[0];
            var valueText = '';
            switch (seriesName) {
                case 'ЭТАП ФИН. ЦИКЛА':
                    valueText = numeral(point.value).format('0.00') + ' дней';
                    break;
                case 'ФИН. ЦИКЛ':
                    valueText = numeral(point.value).format('0.00') + ' дней';
                    break;
            };
            var obj = $('<div>').css('text-align', 'center').css('line-height', '15px').css('margin-bottom', '10px');
            obj.append($('<b>').text(valueText).css('font-size', '15px').css('font-weight', 'normal'));
            items[index] = obj.prop('outerHTML');
        });
        return { html: items.join('\n') };
    };
    
    onFinCycleInitializedEventHandler(e) {
        this.ins = e.component;
    };
    
    customizeLabel() {
        return {
            visible: true,
            backgroundColor: "#fff",
            font: {
                color: "#959595"
            },
            customizeText: function () {
                return this.valueText + ' дней';
            }
        };
    };
}
