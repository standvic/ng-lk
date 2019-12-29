import {Component, OnInit, ViewChild} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import {MoneyDynamicChartComponent} from '../../components/money-dynamic-chart/money-dynamic-chart.component';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import {DateUtilsService} from '../../services/date-utils/date-utils.service';
import * as numeral from 'numeral';
import 'numeral/locales/ru';
import * as moment from "moment";
import 'moment/locale/ru';
import * as $ from 'jquery';

@Component({
    selector: 'app-money-account-receivable-payable',
    templateUrl: './money-account-receivable-payable.component.html',
    styleUrls: ['./money-account-receivable-payable.component.css']
})
export class MoneyAccountReceivablePayableComponent implements OnInit {

    @ViewChild("chart1") chart1: MoneyDynamicChartComponent;
    @ViewChild("chart1") chart2: MoneyDynamicChartComponent;
    @ViewChild("chart1") chart3: MoneyDynamicChartComponent;

    chartDataSource1: any;
    chartDataSource2: any;
    chartDataSource3: any;
    
    /*endSelected = new Date();
    startSelected = DateUtilsService.getLastMonthsDay(12);
    chartData = {
        'Type': 'year',
        'Currency': "RUR",
        'StartDate': this.startSelected,
        'EndDate': this.endSelected
    };*/
    
    chartSeries: any = [{
        name: 'ДЕБИТОРСКАЯ ЗАДОЛЖЕННОСТЬ',
        axis: "amount",
        argumentField: "OnDate",
        valueField: 'AmountReceivable',
        color: "darkseagreen",
        point: {
            visible: false
        }
    }, {
        name: 'ПРОСРОЧЕННАЯ ДЕБИТОРСКАЯ ЗАДОЛЖЕННОСТЬ',
        axis: "amount",
        argumentField: "OnDate",
        valueField: 'AmountOverdueReceivable',
        color: "orange",
        point: {
            visible: false
        }
    }, {
        name: 'ПРОБЛЕМНАЯ ДЕБИТОРСКАЯ ЗАДОЛЖЕННОСТЬ',
        axis: "amount",
        argumentField: "OnDate",
        valueField: 'AmountProblemReceivable',
        color: "red",
        point: {
            visible: false
        }
    }];
    //chartSeries2: any = this.chartSeries1;
    //chartSeries3: any = this.chartSeries1;
    
    valueAxis: any = [{
        name: 'amount',
        position:'left',
        visible: true,
        label: {
            format: "largeNumber"
        },
        format: "decimal"
    }];
    //valueAxis2: any = this.valueAxis1;
    //valueAxis3: any = this.valueAxis1;
    
    tooltip: any = {
                enabled: true,
                shared: true,
                format: {
                    type: 'largeNumber',
                    precision: 1
                },
                customizeTooltip: function (arg) {
                    var points = arg.points,
                        items = arg.valueText.split('\n');
                    $.each(points, function (index, point) {
                        var seriesName = (point.seriesName.split(','))[0];
                        var valueText = '';
                        var obj = $('<div>').css('text-align', 'center').css('line-height', '15px').css('margin-bottom', '10px');
                        obj.append($('<span>').text(seriesName));
                        obj.append($('<br />'));
                        obj.append($('<b>').text(numeral(point.value).format('(0.00a)')).css('color', point.point.getColor()).css('font-size', '20px').css('font-weight', 'normal'));
                        items[index] = obj.prop('outerHTML');
                    });
                    return { html: items.join('\n') };
                }
            }
    
    constructor() {}

    ngOnInit() {
        this.reloadChartDataSource();
    }

    reloadChartDataSource() {
        let self = this;
        this.chartDataSource1 = new DataSource({
            load: function (loadOptions) {
                self.chart1.showLoadingIndicator();
                self.chart1.chartData['Currency'] = 'RUR';
                self.chart1['StartDate'] = DateUtilsService.getLastMonthsDay(12);
                self.chart1['EndDate'] = new Date();
                return RestClientService.get("GetMoneyAccountReceivablePayableWithOverdue", self.chart1.chartData)
                .done(function (result: any) {
                    for (var n in result) {
                        result[n].OnDate = moment(result[n].OnDate).toDate();
                    }
                    
                });
            }
        });
        this.chartDataSource2 = new DataSource({
            load: function (loadOptions) {
                self.chart1.showLoadingIndicator();
                self.chart1.chartData['Currency'] = 'USD';
                return RestClientService.get("GetMoneyAccountReceivablePayableWithOverdue", self.chart2.chartData)
                .done(function (result: any) {
                    for (var n in result) {
                        result[n].OnDate = moment(result[n].OnDate).toDate();
                    }
                });
            }
        });
        this.chartDataSource3 = new DataSource({
            load: function (loadOptions) {
                self.chart1.showLoadingIndicator();
                self.chart1.chartData['Currency'] = 'EUR';
                return RestClientService.get("GetMoneyAccountReceivablePayableWithOverdue", self.chart3.chartData)
                .done(function (result: any) {
                    for (var n in result) {
                        result[n].OnDate = moment(result[n].OnDate).toDate();
                    }
                });
            }
        });
    }
    
    customizeLegendText = function(){
      return "customize me!!!";
    }
}
