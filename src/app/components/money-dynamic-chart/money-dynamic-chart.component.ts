import {Component, OnInit, Input, Output, ViewChild, EventEmitter} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DateUtilsService} from '../../services/date-utils/date-utils.service';
import * as moment from "moment";
import 'moment/locale/ru';
import {DxChartComponent} from "devextreme-angular";

@Component({
    selector: 'app-money-dynamic-chart',
    templateUrl: './money-dynamic-chart.component.html',
    styleUrls: ['./money-dynamic-chart.component.css']
})

export class MoneyDynamicChartComponent implements OnInit {
    @Input() caption: string;
    origCaption: string;
    @Input() dataSource: any;
    @Input() series: any;
    @Input() palette: string;
    @Input() commonSeriesSettings: any;
    @Input() customizeLegendText: any;
    @Input() argumentAxis: any = {
        argumentType: 'datetime',
        grid: {
            visible: true
        }
    };
    @Input() valueAxis: any;
    @Input() tooltip: any;
    @Input() alwaysUpdateTitle: boolean = false;
    @Input() rowCount: number = 1;
    @Output() buttonClick = new EventEmitter<string>();

    @ViewChild("myChart") myChart: DxChartComponent;

    chartData = {
        'Type': 'year',
        'StartDate': DateUtilsService.getLastMonthsDay(12),
        'EndDate': new Date()
    };

    constructor(private translate: TranslateService) {}

    ngOnInit() {
        this.translate.get('STOCK_DYNAMIC_BALANCE_PAGE.CHART_CAPTION_ON', null).subscribe((res: string) => {this.predlog = res;});
        
        if (this.alwaysUpdateTitle == true) {
            this.updateTitle();
        }
    }

    reloadChartDataSource() {
        this.myChart.instance.getDataSource().reload();
        if (this.alwaysUpdateTitle == true) {
            this.updateTitle();
        }
    }

    showLoadingIndicator() {
        if (this.myChart.instance != undefined) {
            this.myChart.instance.showLoadingIndicator();
        }
    }

    getNextPeriod(way: string) {
        DateUtilsService.getNextPeriod(way, this.chartData);
    }

    onButtonClick(btnType: string) {
        this.buttonClick.emit(btnType);

        switch (btnType) {
            case "LeftOptionsButton": {
                DateUtilsService.getNextPeriod('-', this.chartData);
                break;
            }
            case "RightOptionsButton": {
                DateUtilsService.getNextPeriod('+', this.chartData);
                break;
            }
            case "CurrentMonthButton": {
                this.chartData.Type = 'month';
                DateUtilsService.getNextPeriod('', this.chartData);
                break;
            }
            case "CurrentQuarterButton": {
                this.chartData.Type = 'quarter';
                DateUtilsService.getNextPeriod('', this.chartData);
                break;
            }
            case "CurrentYearButton": {
                this.chartData.Type = 'year';
                DateUtilsService.getNextPeriod('', this.chartData);
                break;
            }
        }

        this.reloadChartDataSource(); 
    }
    
    predlog:string;
    isFirstUpdate:boolean = true;
    updateTitle() {
        if (this.isFirstUpdate == true && this.caption != '' && this.caption != undefined)
        {
            this.origCaption = this.caption;
            this.isFirstUpdate = false;
        }
        var textTitle = this.origCaption;
        var newLegend;
        var dateFrom = moment(this.chartData.StartDate).toDate();
        switch (this.chartData.Type) {
            case 'year':
                newLegend = moment(dateFrom).format('YYYY');
                break;
            case 'quarter':
                newLegend = moment(dateFrom).format('Q, YYYY');
                break;
            case 'month':
                newLegend = moment(dateFrom).locale(this.translate.currentLang).format('MMMM') + ', ' + moment(dateFrom).format('YYYY');
                break;
            default:
                break;
        }

        this.caption = textTitle + ' ' + this.predlog + ' ' + newLegend;
    }
}
