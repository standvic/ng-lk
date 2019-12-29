import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {DateUtilsService} from '../../services/date-utils/date-utils.service';
import * as moment from "moment";
import 'moment/locale/ru';
import { DxRangeSelectorComponent } from "devextreme-angular";

@Component({
  selector: 'app-range-selector',
  templateUrl: './range-selector.component.html',
  styleUrls: ['./range-selector.component.css']
})

export class RangeSelectorComponent implements OnInit {
  @Input() rangeDataSource: any;
  @Output() selectedStartValue: Date;
  @Output() selectedEndValue: Date;
  
  @Input() value: any; 
  
  @Output() rangeChanged = new EventEmitter<any>();
  @Input() series:any;
  
  @Input() scaleStartValue:any;
  @Input() scaleEndValue:any;
  
  @ViewChild("rangeselector") rangeSelector: DxRangeSelectorComponent;
  
  onValueChanged(e) {
      this.rangeChanged.emit(e);
  }
  
  @Output() rangeData = {
        'Type': 'year',
        'StartDate': moment(DateUtilsService.getYearFirstDay(new Date())).toISOString(),
        'EndDate': moment(DateUtilsService.getYearLastDay(new Date())).toISOString()
    };
  
  @Input() moveToNextPeriod()
  {
      DateUtilsService.getNextPeriod('+', this.rangeData);
      //this.selectedStartValue = new Date(this.rangeData.StartDate);
      //this.selectedEndValue = new Date(this.rangeData.EndDate);
      
      this.rangeDataSource.reload();
  }
  
  @Input() moveToPrevPeriod()
  {
      DateUtilsService.getNextPeriod('-', this.rangeData);
      this.rangeDataSource.reload();
  }
  
  repaint(){
      this.rangeSelector.instance.render();
  }
  
  constructor() { }

  ngOnInit() {
      
  }
  
}
