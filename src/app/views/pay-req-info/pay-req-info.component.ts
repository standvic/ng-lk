import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import {Router} from '@angular/router';
import {DxDataGridComponent} from "devextreme-angular";
import * as moment from "moment";
import 'moment/locale/ru';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import * as $ from 'jquery';

@Component({
    selector: 'app-pay-req-info',
    templateUrl: './pay-req-info.component.html',
    styleUrls: ['./pay-req-info.component.css']
})
export class PayReqInfoComponent implements OnInit {

    payReq: any;
    id: number;
    subtype: string;
    plannedDate: any;
    contragent: string;
    purpose: string;
    company: string;
    recipient: any;
    transfer: string;
    currency: string;
    amount: DataSource;
    reasonText: string;
    attachments: any;
    signers: any;
    loadingReqInfoVisible: boolean = false;
    popupVisible = false;
    customLabels: any = ['ни в какие ворота не лезет', 'через пень-колоду, но победили', 'хорошо, хотя и не без шероховатостей', 'блестяще, невозможно пожелать лучшего'];

    constructor(private activateRoute: ActivatedRoute, public router: Router) {
        this.id = this.activateRoute.snapshot.params['id'];
        this.format = this.format.bind(this);
    }

    ngOnInit() {
        this.loadingReqInfoVisible = true;
        let self = this;
        this.payReq = new DataSource({
            load: function (loadOptions) {
                let params = {"Id": self.id};
                return RestClientService.get("GetPaymentRequestDocument", params)
                    .done(function (result: any) {
                        self.subtype = result.SubType;
                        self.plannedDate = moment(result.PlannedDate).format('L');
                        self.contragent = result.AgentName;
                        self.purpose = result.PaymentPurpose;
                        self.company = result.FirmName;
                        self.recipient = result.RecipientTypeName;
                        self.transfer = result.TransferTypeName;
                        self.currency = result.CurrencyCode;
                        self.amount = result.Amount;
                        self.attachments = result.Attachments;
                        self.signers = result.Signers;
                        /*self.comm = new DataSource({
                            load: function (loadOptions: any) { 
                                return result.Comments
                            }
                        });
                        self.comm.reload();*/
                        self.loadingReqInfoVisible = false;
                    });
            }
        });
    }

    approveButtonClick(e: any) {
        let self = this;
        this.loadingReqInfoVisible = true;
        var params = {"ID": this.id};
        var post = RestClientService.get("ApprovePayReq", params);
        post.done(function (p) {
            self.loadingReqInfoVisible = false;
            notify('Заявка подписана!', 'success', 2000);
            setTimeout(function () {self.router.navigate(['payReqGrid']);}, 2000);
        });
    };

    rejectButtonClick(e: any) {
        this.popupVisible = true;
    };

    downloadFile(e) {
        let fstore = window.localStorage['FileStore'];
        //var config = JSON.parse(window.localStorage['Configuration']);
        var params = {"Id": e.data.Id};
        var post = RestClientService.getFile("GetFile", params);
        post.done(function (p) {
            //document.location.assign(config.FileStore + e.data.FileName);
            document.location.assign(fstore + e.data.FileName);
            return;
        });
    };

    rejectFunc() {
        let self = this;
        this.loadingReqInfoVisible = true;
        if (!this.reasonText) {
            notify('Комментарий обязателен!', 'warning', 4000);
            self.loadingReqInfoVisible = false;
            self.popupVisible = false;
            return;
        }
        var params = {"Id": this.id, "Comments": this.reasonText};
        var post = RestClientService.get("RejectPayReq", params);
        post.done(function (p) {
            self.loadingReqInfoVisible = false;
            self.popupVisible = false;
            notify('Заявка отклонена!', 'error', 2000);
            setTimeout(function () {self.router.navigate(['payReqGrid']);}, 2000);
        });
    };

    commentValueChanged(e: any) {
        this.reasonText = e.value;
    };

    cancelFunc() {
        this.popupVisible = false;
    };

    format(value: any) {
        var newValue = this.customLabels[value];
        if (!newValue)
            return value;
        else
            return newValue;
    };
    
    onValueChanged(e: any) {
    }

}
