import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { DxChartComponent } from "devextreme-angular";
import {TranslateService} from '@ngx-translate/core';
import * as moment from "moment";
import 'moment/locale/ru';
import * as numeral from 'numeral';
import 'numeral/locales/ru';
import * as $ from 'jquery';

@Component({
    selector: 'app-popup-turnover-content',
    templateUrl: './popup-turnover-content.component.html',
    styleUrls: ['./popup-turnover-content.component.css']
})
export class PopupTurnoverContentComponent implements OnInit {
    
    @ViewChild("linechart") linechart: DxChartComponent;
    @ViewChild("barchart") barchart: DxChartComponent;
    
    @Input() company: string;
    @Input() agent: string;
    @Input() contract: string;
    @Input() delay: string;
    @Input() currency: string;
    @Input() creditAmount: number;
    @Input() contractID: number;
    @Input() popwidth: number;
    @Input() popheight: number;
    @Input()dataSourceLineChart: any;
    @Input()dataSourceBarChart: any;
    @Input() selectorScale: any;

    width: number;
    widthR: number;
    heightL: number;
    heightB: number;
    heightR: number;
    margin: number;
    min: Date = new Date();
    max: Date = new Date();
    lineChartTitle: string;
    barChartTitle: string;
    valueAxisLine: any = [];
    valueAxisBar: any = [];
    
    date: any; 
    startSelected: any;
    endSelected: any;
    
    constructor(private translate: TranslateService) {}

    ngOnInit() {
        this.heightL = this.popheight*0.33;
        this.heightB = this.popheight*0.34;
        //this.max = new Date();
        //console.log(this.max);
        this.min.setDate(this.max.getDate() - 180); //= moment().add(-180, 'days');
        //console.log(this.min);
        this.widthR = this.popwidth*0.97;
        this.heightR = this.popheight*0.17;
        this.margin = this.popwidth*0.05;
        
        this.valueAxisLine = [{
            name: 'debt',
            position:'left',
            visible: true,
            label: {
                customizeText: function () {
                    var labelText;
                    labelText = numeral(this.value).format('0,0.00a');
                    return labelText;
                }
            },
            format: "currency",
            constantLines: [this.creditAmount == 0 ? null : {
                            label: {
                                text: "Сумма кредита " + numeral(this.creditAmount).format('0,0') +" " + this.currency
                            },
                            width: 2,
                            value: this.creditAmount,
                            color: "#ff7c7c",
                            dashStyle: "dash"
                        }],
            constantLineStyle: {
                paddingTopBottom: 5
            }
        }];
        this.valueAxisBar = [{
            name: 'Sale',
            position:'left',
            visible: true,
            label: {
                customizeText: function () {
                    var labelText;
                    labelText = numeral(this.value).format('0,0.00a');
                    return labelText;
                }
            },
            format: 'currency'
        }];
        
        this.translate.get('ACCOUNT_RECEIVABLE_TURNOVER_REPORT_PAGE.POPUP_WINDOW.LINE_CHART_TITLE', null).subscribe((res: string) => {
            this.lineChartTitle = res + this.currency;
        });
        this.translate.get('ACCOUNT_RECEIVABLE_TURNOVER_REPORT_PAGE.POPUP_WINDOW.BAR_CHART_TITLE', null).subscribe((res: string) => {
            this.barChartTitle = res + this.currency;
        });
    }

    customizeTooltipLine(arg: any) {
        var points = arg.points,
            items = arg.valueText.split('\n');
            $.each(points, function (index: any, point: any) {                        
                var seriesName = (point.seriesName.split(','))[0];
                var valueText = numeral(point.value).format('0.00a');
                var obj = $('<div>').css('text-align', 'center').css('line-height', '15px').css('margin-bottom', '10px');
                obj.append($('<span>').text(seriesName));
                obj.append($('<br />'));
                obj.append($('<b>').text(valueText).css('color', point.point.getColor()).css('font-size', '20px').css('font-weight', 'normal'));
                items[index] = obj.prop('outerHTML');
            });
        return { html: items.join('\n') };
    }
    
    customizeTooltipBar (arg: any) {
        let points = arg.points,
        items: any = [];
        $.each(points, function (index: any, point: any) {                        
            var seriesName = (point.seriesName.split(','))[0];
            if (point.value != 0) {
                var valueText = numeral(point.value).format('0.00a');
                var argText = moment(point.argumentText).format("LL");
                var obj = $('<div>').css('text-align', 'center').css('line-height', '15px').css('margin-bottom', '10px');
                obj.append($('<span>').text(seriesName));
                obj.append($('<br />'));
                obj.append($('<b>').text(valueText).css('color', point.point.getColor()).css('font-size', '20px').css('font-weight', 'normal'));
                obj.append($('<br />'));
                obj.append($('<b>').text(argText).css('font-size', '15px').css('font-weight', 'normal'));
                items[index] = obj.prop('outerHTML');
            };
        });
    return { html: items.join('\n') };
    }
    
    onValueChanged(e: any) {
        //var zoomedChart = $("#lineChart").dxChart("instance");
        this.linechart.instance.zoomArgument(e.value[0], e.value[1]);
        //zoomedChart = $("#barChart").dxChart("instance");
        this.barchart.instance.zoomArgument(e.value[0], e.value[1]);
    }
    
    customizeText(e: any) {
        return e.valueText;
    }
}
