import {Component, OnInit, Input} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import * as $ from 'jquery';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    constructor(public translate: TranslateService) {
        
    }

    ngOnInit() {
    }

}
