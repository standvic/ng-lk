// use it: <app-caption>{{captionText}}</app-caption>

import { Component, } from '@angular/core';

@Component({
  selector: 'app-caption',
  template: '<h1><ng-content></ng-content></h1>',
  styles: ['h1{margin-bottom:30px;font-size:15pt}; *{font-family: "Helvetica Neue","Segoe UI",Helvetica,Verdana,san-serif;}']
})
export class CaptionComponent {
}

