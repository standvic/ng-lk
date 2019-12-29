import {Component, OnInit} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import * as moment from "moment";
import 'moment/locale/ru';
import * as numeral from 'numeral';
import 'numeral/locales/ru';
import * as $ from 'jquery';

@Component({
    selector: 'app-cash-flow-analysis-chart',
    templateUrl: './cash-flow-analysis-chart.component.html',
    styleUrls: ['./cash-flow-analysis-chart.component.css']
})
export class CashFlowAnalysisChartComponent implements OnInit {

    dataCashFlowAnalysisSource: any;

    constructor() {
    }

    ngOnInit() {
        this.dataCashFlowAnalysisSource = new DataSource({ 
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
    }
    
    cashFlowAnalysisCustomizeTooltip(point: any) {
        var items = ''.split('\n');
        var obj = $('<div>').css('text-align', 'center').css('line-height', '15px').css('margin-bottom', '10px');
        obj.append($('<span>').text(point.seriesName));
        obj.append($('<br />'));
        obj.append($('<b>').text(numeral(point.valueText).format('0.00a')).css('color', point.point.getColor()).css('font-size', '20px').css('font-weight', 'normal'));
        items[0] = obj.prop('outerHTML');          
        return { html: items.join('\n') };
    };
    customizeText(arg: any) {
        var labelText;
        labelText = numeral(arg.value).format('0.00a');
        return labelText;
    }

}
