import {Component, OnInit} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import {Router} from '@angular/router';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import {DateUtilsService} from '../../services/date-utils/date-utils.service';
import * as numeral from 'numeral';
import 'numeral/locales/ru';
import * as moment from "moment";
import 'moment/locale/ru';

@Component({
    selector: 'app-pay-req-grid',
    templateUrl: './pay-req-grid.component.html',
    styleUrls: ['./pay-req-grid.component.css']
})
export class PayReqGridComponent implements OnInit {

    gridDataSource: any;
    columns: any = [{
                dataField: 'Id',
                caption: 'Код заявки',
                cellTemplate: 'cellTemplate'
            },{
                dataField: 'PlannedDate',
                caption: 'Планируемая дата',
                dataType: 'date',
                customizeText: function (options) {
                    return !options.value ? "" : moment(options.value).format("L");
                }
            },{
                dataField: 'SubType',
                caption: 'Подтип документа'
            },{
                dataField: 'FirmName',
                caption: 'Компания'
            },  {
                dataField: 'AgentName',
                caption: 'Контрагент',
            },  {
                dataField: 'PaymentPurpose',
                caption: 'Назначение платежа'
            }, {
                dataField: 'RecipientTypeName',
                caption: 'Тип получателя оплаты'
            }, {
                dataField: 'TransferTypeName',
                caption: 'Тип перевода',
                validationRules: [{ type: 'required' }]
            }, {
                dataField: 'CurrencyCode',
                caption: 'Валюта',
                validationRules: [{ type: 'required' }]
            }, {
                dataField: 'Amount',
                caption: 'Сумма валюты',
                format: {
                    style: 'decimal'
                }
            }]

    constructor() {}

    ngOnInit() {
        this.gridDataSource = new DataSource({
        load: function (loadOptions) {
            return RestClientService.get("GetPaymentRequests", {});
        }        
    });
    }

}
