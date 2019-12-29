import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DxButtonComponent } from "devextreme-angular";
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-period-button',
  templateUrl: './period-button.component.html',
  styleUrls: ['./period-button.component.css']
})
export class PeriodButtonComponent implements OnInit {

  @Output() buttonClick = new EventEmitter<string>();
  
  @ViewChild("buttonLeftOptions") leftOptionBtn: DxButtonComponent;
  @ViewChild("buttonRightOptions") rightOptionBtn: DxButtonComponent;
  @ViewChild("buttonCurrentMonthOptions") buttonCurrentMonthOptions: DxButtonComponent;
  @ViewChild("buttonCurrentQuarterOptions") buttonCurrentQuarterOptions: DxButtonComponent;
  @ViewChild("buttonCurrentYearOptions") buttonCurrentYearOptions: DxButtonComponent;
  
  resetToNormal() {
      this.buttonCurrentMonthOptions.instance.option('type', 'normal');
      this.buttonCurrentQuarterOptions.instance.option('type', 'normal');
      this.buttonCurrentYearOptions.instance.option('type', 'normal');
    }
  
  onLeftOptBtnClick() {
      this.rightOptionBtn.instance.option('disabled', false);
      this.buttonClick.emit('LeftOptionsButton');
  }
  
  onRightOptBtnClick() {
      this.buttonClick.emit('RightOptionsButton');
  }
  
  onMonthBtnClick() {
      this.resetToNormal();
      this.buttonCurrentMonthOptions.instance.option('type', 'default');
      this.rightOptionBtn.instance.option('disabled', true);
      this.buttonClick.emit('CurrentMonthButton');
  }
  
  onQuarterBtnClick() {
      this.resetToNormal();
      this.buttonCurrentQuarterOptions.instance.option('type', 'default');
      this.rightOptionBtn.instance.option('disabled', true);
      this.buttonClick.emit('CurrentQuarterButton');
  }
  
  onYearBtnClick() {
      this.resetToNormal();
      this.buttonCurrentYearOptions.instance.option('type', 'default');
      this.rightOptionBtn.instance.option('disabled', true);
      this.buttonClick.emit('CurrentYearButton');
  }
  
  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

}
