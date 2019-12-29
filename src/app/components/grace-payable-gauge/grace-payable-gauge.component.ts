import {Component, OnInit, ViewChild} from '@angular/core';
import {DxCircularGaugeComponent} from "devextreme-angular";
import {RestClientService} from '../../services/rest-client/rest-client.service';
import * as numeral from 'numeral';
import 'numeral/locales/ru';
import * as $ from 'jquery';

@Component({
    selector: 'app-grace-payable-gauge',
    templateUrl: './grace-payable-gauge.component.html',
    styleUrls: ['./grace-payable-gauge.component.css']
})
export class GracePayableGaugeComponent implements OnInit {
    @ViewChild('PayableGauge') graceGauge: DxCircularGaugeComponent;
    dataSource: any = {};
    gaugeInstance: any = {};

    constructor() {}

    ngOnInit() {
        let self = this;
        let control = self.graceGauge.instance;
        //control.showLoadingIndicator();
        //control.value(0.0);
        RestClientService.get('GetMoneyGraceValueAccountPayable', {})
            .done(function (result: any) {
                let control = self.graceGauge.instance;
                //Object.assign(self.gaugeInstance, self.graceGauge.instance);
                control.hideLoadingIndicator();
                var newValue = 0.0;
                if (result.TotalAmount != 0) {
                    newValue = (result.GraceAmount / result.TotalAmount) * 100;
                }
                $('#PayableGauge').attr('graceAmount', numeral(result.GraceAmount / 1000).format('0,0'));
                $('#PayableGauge').attr('totalAmount', numeral(result.TotalAmount / 1000).format('0,0'));
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
        obj.append($('<span>').text('Проблемная задолженность'));
        obj.append($('<br />'));
        obj.append($('<b>').text($('#PayableGauge').attr('graceAmount') + " тыс. руб").css('font-size', '20px').css('font-weight', 'normal'));
        items[0] = obj.prop('outerHTML');

        obj = $('<div>').css('text-align', 'center').css('line-height', '15px').css('margin-bottom', '10px');
        obj.append($('<span>').text('Просроченная задолженность'));
        obj.append($('<br />'));
        obj.append($('<b>').text($('#PayableGauge').attr('totalAmount') + " тыс. руб").css('font-size', '20px').css('font-weight', 'normal'));
        items[1] = obj.prop('outerHTML');

        return {html: items.join('\n')};
    }

}
