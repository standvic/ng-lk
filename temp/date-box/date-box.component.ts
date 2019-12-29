// use it: <app-date-box [caption]="dateBoxCaption" [(value)]="gridDate"></app-date-box>
// если caption пустой то будет отображаться только блок с дата эдитом без отступа.
// привязка у value двусторонняя поэтому ловить событие на изменение не нужно тк есть внутренний вызов об изменении модели

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-box',
  templateUrl:'./date-box.component.html',
  styleUrls: ['./date-box.component.css']
})
export class DateBoxComponent {
  @Input() caption: string;
  @Input() value: Date;
  @Output() valueChange = new EventEmitter<Date>();
    onDateChange(model: Date){
        this.value = model;
        this.valueChange.emit(model);
    }
  
}