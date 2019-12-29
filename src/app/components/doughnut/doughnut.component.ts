import { Component, OnInit, Input } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import {DateUtilsService} from '../../services/date-utils/date-utils.service';
import * as moment from "moment";
import 'moment/locale/ru';
import * as numeral from 'numeral';
import 'numeral/locales/ru';
import * as $ from 'jquery';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.css']
})
export class DoughnutComponent implements OnInit {
  @Input() label:string;
  @Input() dataService: string;
  @Input() argumentField: string;
  @Input() valueField: string;
  @Input() float: string = 'left';
  
  pieDataSource:any;
  
  chartData = {
        'StartDate': moment(DateUtilsService.getYearFirstDay(new Date())).toISOString(),
        'EndDate': moment(DateUtilsService.getYearLastDay(new Date())).toISOString()
    };
  
  customizeTooltip = function (arg) {
                    var outputValue;
                    outputValue = numeral(this.value).format('(0,0.00a)');
                    var obj = $('<div>').css('text-align', 'center').css('line-height', '15px').css('margin-bottom', '10px');
                    obj.append($('<span>').text(this.argumentText));
                    obj.append($('<br />'));
                    obj.append($('<b>').text(outputValue).css('color', this.point.getColor()).css('font-size', '20px').css('font-weight', 'normal'));
                    return {
                        text: obj.prop('outerHTML')
                    };
                };
   
  customizeText = function () {
                        return this.percentText + ' - ' + this.argumentText;
                  };
                 
  constructor() { }

  ngOnInit() {let self = this;
      this.pieDataSource = new DataSource({
        load: function (loadOptions) {
            return RestClientService.get(self.dataService, self.chartData);
        }
    });
  }

  @Input() moveToPeriod(startDate: string, endDate: string)
  {
      this.chartData.StartDate = startDate;
      this.chartData.EndDate = endDate;
      this.pieDataSource.reload();
  }
}
