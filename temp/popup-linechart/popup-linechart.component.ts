import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-popup-linechart',
    templateUrl: './popup-linechart.component.html',
    styleUrls: ['./popup-linechart.component.css']
})
export class PopupLinechartComponent implements OnInit {
    
    @Input() dataSource: any;

    constructor() {}

    ngOnInit() {
    }

}
