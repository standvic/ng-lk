import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-arrow-button',
  templateUrl: './arrow-button.component.html',
  styleUrls: ['./arrow-button.component.css']
})
export class ArrowButtonComponent implements OnInit {
  @Input() isLeft: boolean = true;
  @Input() width: number;
  @Input() height: number;
  @Input() isDisabled: boolean = false;
  
  @Output() buttonClick = new EventEmitter<boolean>();
  
  onBtnClick() {
      this.buttonClick.emit(this.isLeft);
  }

  constructor() { 
  }

  ngOnInit() {
  }
    
}
