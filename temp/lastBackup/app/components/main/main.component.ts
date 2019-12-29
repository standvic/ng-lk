import {Component, OnInit, ViewChild} from '@angular/core';
import {Router}      from '@angular/router';
import {DxListComponent} from 'devextreme-angular';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import {LazyDataSource} from '../../services/lazy-data-source/lazy-data-source.service';
import {DateUtilsService} from '../../services/date-utils/date-utils.service'
import DataSource from 'devextreme/data/data_source';
import * as numeral from 'numeral';
import 'numeral/locales/ru';
import * as moment from "moment";
import 'moment/locale/ru';
import * as $ from 'jquery';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    @ViewChild("moneyList") list: DxListComponent;
    constantCycle: number = 0;
    maxval: number = 0;
    minval: number = 0;
    attrVal: any = [{
        //name: 'Value',
        position:'left',
        tickInterval: 20,
        format: 'decimal',
        title: {
            text: 'ИНТЕРВАЛ, ДНИ'
        },
        grid: {
            color: '#d3d3d3',
            opacity: null,
            visible: true,
            width: 1
        },
        constantLines: [{
            label: {
                text: 'Финансовый цикл ' + numeral(this.constantCycle).format('0.00') +' дней'
            },
            width: 2,
            value: this.constantCycle,
            color: '#ff7c7c',
            dashStyle: 'dash'
        }],
        constantLineStyle: {
            paddingTopBottom: 5
        },
        max: this.constantCycle > this.maxval ? this.constantCycle + 10 : this.maxval,
        min: this.constantCycle < this.minval ? this.constantCycle - 10 : this.minval
      }];
    endSelected: any = new Date();
    startSelected: any = DateUtilsService.getLastMonthsDay(6);
    chartData: any = {
        'StartDate': this.startSelected,
        'EndDate': this.endSelected
    };
    moneyLinks: any = [{
                "key": "Подробнее о денежном потоке...",
                "items": [{title:"Отчёт о движении денежных средств",link:"moneyCashBalance"},
                        {title:"Просроченная дебиторская задолженность",link:"moneyAccountsReceivableWithOverdue"},
                        {title:"Просроченная кредиторская  задолженность",link:"moneyAccountsPayableWithOverdue"},
                        {title:"Покупатели с плохой платёжной дисциплиной",link:"accountReceivableTurnoverReport"},
                        {title:"Возвраты денежных средств покупателям",link:"moneyCustomerReturns"}]
    }];
    financeLinks: any = [{
                "key": "Подробнее о финансовом цикле...",
                "items": [{title:"Сроки оплат покупателей",link:"accountReceivableTurnoverReport"},
                          {title:"Сроки поставки поставщиков",link:"purchaseDeliveryDebtsTurnover"},
                          {title:"Сроки реализации складских запасов",link:"articlesTurnover"},
                          {title:"Сроки поставки поставщикам",link:"suppliersAveragePayment"}]
    }];
    profitLinks: any = [{
                "key": "Подробнее о прибыли...",
                "items": [{title:"Отчет о продажах",link:"profitAnalysis"}]
    }];
//-------------------------------------- остатки денежных средств ---------------------------------------------------    
    dataGridBalanceSource: any = new LazyDataSource({
            load: function (loadOptions: any) {
                return RestClientService.get('GetHighlightReport', {});
            }
        });
//---------------------------------------- средний остаток денежных средств за последние 12 месяцев -------------------------------------------------        
    dataAverageMoneyBalanceSource: any = new DataSource({
            load: function (loadOptions: any) {
                return RestClientService.get('GetAverageMoneyBalanceHistory', {})
                .done(function (result: any) {
                        for (var n in result) {
                            result[n].argName = moment.months(result[n].Month-1) + ' ' + result[n].Year.toString() + ' г.';
                        }
                });
            }
        });
//---------------------------------------- структура денежного потока -------------------------------------------------        
    dataCashFlowAnalysisSource: any = new DataSource({ 
            load: function (loadOptions) {
                return RestClientService.get('GetCashFlowAnalysis',{StartDate:moment().add(-180, 'days'),EndDate: new Date()})
                    .done(function (result: any) {
                        for (var n in result) {
                            result[n].date = moment(result[n].Date).toDate();
                            result[n].Sum = result[n].Oper + result[n].Fin + result[n].Invest
                        }
                    });
            }
    });
//---------------------------------------- среднемесячный операционный денежный поток -------------------------------------------------    
    dataAverageOperationalSource: any = new DataSource({
        load: function (loadOptions: any) {
            return RestClientService.get('GetAverageOperationalCashFlow', {});
        }
    });
//----------------------------------------------- финансовый цикл ----------------------------------------------------------------    
    chartFinDataSource = new DataSource({
        load: function (loadOptions: any) {
            let chartFinData = {StartDate: null, EndDate: null, Period: 0};
            Object.assign(chartFinData,this.chartData);
            chartFinData.StartDate = new Date();
            chartFinData.EndDate = new Date();
            chartFinData.Period = 180;
            return RestClientService.get('GetFinancialCycle', chartFinData)
                .done(function (result: any) {
                    this.maxval = result[0].Value;
                    this.minval = result[0].Value;
                    this.constantCycle = 0;
                    for (var i in result){
                        if (this.maxval < result[i].Value)
                            this.maxval = result[i].Value;
                        if (this.minval > result[i].Value)
                            this.minval = result[i].Value;
                        this.constantCycle += result[i].Value;
                    };
                });
            }
    });
//---------------------------------------- дебиторская задолженность -------------------------------------------------    
    dataDebitorBalanceSource: any = new LazyDataSource({
        load: function (loadOptions: any) {
            return RestClientService.get('GetHighlightAccountReceivableReport', {});
        }
    });
//---------------------------------------- кредиторская задолженность -------------------------------------------------    
    dataCreditorBalanceSource = new LazyDataSource({
        load: function (loadOptions: any) {
            return RestClientService.get('GetHighlightAccountPayableReport', {});
        }
    });
    
    constructor(private router: Router) {
        moment.locale('ru');
        numeral.locale('ru');
    }
        
    ngOnInit() {
        this.dataGridBalanceSource.reload();
        //this.dataAverageOperationalSource.reload();
        this.dataDebitorBalanceSource.reload();
        this.dataCreditorBalanceSource.reload();
        this.chartFinDataSource.reload();
        //this.dataAverageMoneyBalanceSource.load();
        //this.dataCashFlowAnalysisSource.load();
       // this.collapseGroup(0);
    }
    
    collapseGroup (groupIndex: any) {
        this.list.instance.collapseGroup(groupIndex);
    }
    
    calculateCellValueRub(data: any) {
        return Math.round(data.Rub/1000);
    }
    calculateCellValueUsd(data: any) {
        return Math.round(data.Usd/1000);
    }
    calculateCellValueEur(data: any) {
        return Math.round(data.Eur/1000);
    }
    calculateCellValueBase(data: any) {
        return Math.round(data.Base/1000);
    }
    customizeValue(data: any) {
        //return data.value;
        return data.valueText.replace('Сумм: ','');
    }
    calculateCellValueAvgAmount(data: any) {
        return Math.round(data.AvgAmount/1000);
    }
    customizeText(data: any) {
        var labelText;
        labelText = numeral(data.value).format('0.00a');
        return labelText;
    }
    averageMoneyBalanceCustomizeTooltip(point: any) {
        var items = ''.split('\n');
        var obj = $('<div>').css('text-align', 'center').css('line-height', '15px').css('margin-bottom', '10px');
        obj.append($('<b>').text(numeral(point.value).format('(0,0.00a)')).css('color', point.point.getColor()).css('font-size', '20px').css('font-weight', 'normal'));
        items[0] = obj.prop('outerHTML');                    
        return { html: items.join('\n') };
    }
    cashFlowAnalysisCustomizeTooltip(point: any) {
        var items = ''.split('\n');
        var obj = $('<div>').css('text-align', 'center').css('line-height', '15px').css('margin-bottom', '10px');
        obj.append($('<span>').text(point.seriesName));
        obj.append($('<br />'));
        obj.append($('<b>').text(numeral(point.valueText).format('0.00a')).css('color', point.point.getColor()).css('font-size', '20px').css('font-weight', 'normal'));
        items[0] = obj.prop('outerHTML');          
        return { html: items.join('\n') };
    }
    onRowPrepared(e: any) {
        if (e.values && e.values[0] == "Возможны внеплановые платежи по погашению проблемной кредиторской задолженности"){
            e.rowElement.style.color = "#ff0000";
        };
        if (e.values && e.values[0] == "Итого" && e.values[1] <0){
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
    groupTemplate(data: any) {
        return data.key;
    }
    itemTemplate(data: any) {
        return $("<a href='" + data.link + "'>" + data.title + "</a>");
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
            //obj.append($('<span>').text(seriesName));
            //obj.append($('<br />'));
            obj.append($('<b>').text(valueText)./*css('color', point.point.getColor()).*/css('font-size', '15px').css('font-weight', 'normal'));
            items[index] = obj.prop('outerHTML');
        });
        return { html: items.join('\n') };
    }
}
