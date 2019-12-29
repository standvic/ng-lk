import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {DxCircularGaugeComponent} from "devextreme-angular";
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import * as numeral from 'numeral';
import 'numeral/locales/ru';
import * as moment from "moment";
import 'moment/locale/ru';
import * as $ from 'jquery';

@Component({
    selector: 'app-grace-gauge',
    templateUrl: './grace-gauge.component.html',
    styleUrls: ['./grace-gauge.component.css']
})
export class GraceGaugeComponent implements OnInit {

    @Input() dataService: string;
    @Input() graceAmountText: string;
    @Input() totalAmountText: string;
    @Input() gaugeId: string;
    
    @ViewChild('ReceivableGauge') graceGauge: DxCircularGaugeComponent;
    dataSource: any = {};

    constructor() {}

    ngOnInit() {
        let self = this;
        let control = self.graceGauge.instance;
        //control.showLoadingIndicator();
        //control.value(0.0);
        RestClientService.get(self.dataService, {})
            .done(function (result: any) {
                let control = self.graceGauge.instance;
                control.hideLoadingIndicator();
                var newValue = 0.0;
                if (result.TotalAmount != 0) {
                    newValue = (result.GraceAmount / result.TotalAmount) * 100;                        
                }
                $('#' + this.gaugeId).attr('graceAmount', numeral(result.GraceAmount / 1000).format('0,0'));
                $('#' + this.gaugeId).attr('totalAmount', numeral(result.TotalAmount / 1000).format('0,0'));
                control.value(newValue);
                control.render();
            });
    }
    
    customizeText(arg: any) {
        return arg.valueText + ' %';
    }
    
    customizeTooltip() {
        var items = '\n'.split('\n');

        var obj = $('<div>').css('text-align', 'center').css('line-height', '15px').css('margin-bottom', '10px');
        obj.append($('<span>').text(this.graceAmountText));
        obj.append($('<br />'));
        obj.append($('<b>').text($('#' + 'ReceivableGauge').attr('graceAmount') + " тыс. руб").css('font-size', '20px').css('font-weight', 'normal'));
        items[0] = obj.prop('outerHTML');

        obj = $('<div>').css('text-align', 'center').css('line-height', '15px').css('margin-bottom', '10px');
        obj.append($('<span>').text(this.totalAmountText));
        obj.append($('<br />'));
        obj.append($('<b>').text($('#' + 'ReceivableGauge').attr('totalAmount') + " тыс. руб").css('font-size', '20px').css('font-weight', 'normal'));
        items[1] = obj.prop('outerHTML');

        return { html: items.join('\n') };
    }

}
