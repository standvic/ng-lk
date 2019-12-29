import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import DataSource from 'devextreme/data/data_source';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import {DateUtilsService} from '../../services/date-utils/date-utils.service';
import * as moment from "moment";
import 'moment/locale/ru';
import * as numeral from 'numeral';
import 'numeral/locales/ru';
import * as $ from 'jquery';

@Component({
    selector: 'app-suppliers-average-payment',
    templateUrl: './suppliers-average-payment.component.html',
    styleUrls: ['./suppliers-average-payment.component.css']
})
export class SuppliersAveragePaymentComponent implements OnInit {

    chartTurnoverDataSource: any;
    dataAccountSource: any;
    
    columns: any = {};
    value: boolean = true;
    popupVisible = false;
    //valueChange = new EventEmitter<boolean>();
    company: string;
    contract: string;
    agent: string;
    delay: string;
    title: string;
    currency: string;
    creditAmount: number;
    contractID: string;
    popwidth: number = window.innerWidth*0.8;
    popheight: number = window.innerHeight*0.95;
    
    dataDebt: any = [];
    dataSource: any;
    selectorScale: any = [];
    dataShipmentPayment: any = [];
    startSelected: Date;
    endSelected: Date;

    constructor(private translate: TranslateService) {
        moment.locale('ru');
        numeral.locale('ru');
    }

    ngOnInit() {
        let self = this;
        this.chartTurnoverDataSource = new DataSource({
            load: function (loadOptions) {
                let chartDelivery = {'StartDate': DateUtilsService.getLastMonthsDay(6), 'EndDate': new Date(), 'TurnoverDays': 180};
                return RestClientService.get("GetAccountPayablesTurnoverTrendReport", chartDelivery)
                    .done(function (result: any) {
                        for (var n in result) {
                            result[n].TransactionDate = moment(result[n].TransactionDate).toDate();
                        };
                    });
            }
        });
        
        this.columns = [{
                dataField: 'FirmName',
                caption: 'Компания',
            }, {
                dataField: 'AgentName',
                caption: 'Контрагент'
            }, {
                dataField: 'ContractNumber',
                caption: 'Контракт'
            }, {
                dataField: 'CurrencyName',
                caption: 'Валюта'
            }, {
                dataField: 'CreditAmount',
                caption: 'Сумма кредита',
                format: {
                    style: 'decimal'
                }
            },{
                dataField: 'AvgDebt',
                caption: 'Средний долг',
                format: {
                    style: 'decimal'
                }
            }, {
                dataField: 'Payments',
                caption: 'Платежи',
                format: {
                    style: 'decimal'
                }
            }, {
                dataField: 'GracePeriod',
                caption: 'Отсрочка по контракту, дней'
            }, {
                dataField: 'AvgPayBack',
                caption: 'Средний срок оплаты, дней',
                sortOrder: 'desc',
                format: {
                    style: 'decimal'
                }
            }];
        this.dataAccountSource = new DataSource({
            load: function (loadOptions) {
                let params = {
                    Date: moment(new Date()).format(),
                TurnoverDays: 180,
                ShowBusinessTransactions: null
                };
                return RestClientService.get("GetAccountPayablesTurnoverReport", params);
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
    
    cellClick(e: any) {
        if (e.column.caption == "Средний срок оплаты, дней") {
            this.popupVisible = true;
        }
        this.company = e.values[0];
        this.agent = e.values[1];
        this.contract = e.values[2];
        this.delay = e.values[7];
        this.creditAmount = e.data.CreditAmount;
        this.currency = e.data.CurrencyName;
        this.contractID = e.data.ContractID;
        this.translate.get('SUPPLIERS_AVERAGE_PAYMENT_PAGE.POPUP_WINDOW.TITLE', null).subscribe((res: string) => {
            this.title = res + this.contract;
        });
        
        let self = this;
        RestClientService.get("GetCurrencyAgentDebtDetailed", {StartDate:moment().add(-180, 'days'),EndDate: new Date(),ContractID:this.contractID}) //Common.getLastMonthsDay(6)
        .done(function(result: any){
            self.dataDebt.splice(0,self.dataDebt.length);
            self.selectorScale.splice(0,self.selectorScale.length);
            for(var i in result) {
                var temp = {date:moment(result[i].Date).toDate(),debt:result[i].Debt,overDebt:result[i].OverDebt,overDebt30:result[i].OverDebt30};
                self.dataDebt.push(temp);
                var temp2 = {date:moment(result[i].Date).toDate(),data:result[i].Debt+result[i].OverDebt+result[i].OverDebt30};
                self.selectorScale.push(temp2);
            }
            
            self.startSelected = self.selectorScale[0].date;
            self.endSelected = self.selectorScale[self.selectorScale.length - 1].date;

            RestClientService.get("GetCurrencyAgentShipmentPaymentDetailed", {StartDate:moment().add(-180, 'days'),EndDate: new Date(),ContractID:self.contractID})
            .done(function(result: any){
                self.dataShipmentPayment.splice(0,self.dataShipmentPayment.length);
                for(var i in result) {
                    var temp = {date:moment(result[i].Date).toDate(),sale:result[i].Sale,saleRet:result[i].SaleRet,payment:result[i].Payment,paymentRet:result[i].PaymentRet,other:result[i].Other};
                    self.dataShipmentPayment.push(temp);
                };
            });
        });
    }
    
    cellHoverChanged(e: any) {
        if(e.column.caption == "Средний срок оплаты, дней") {
            e.cellElement.style.cursor = "pointer";
        }
    }
}
