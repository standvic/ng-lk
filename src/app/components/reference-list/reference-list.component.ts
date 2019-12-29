import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {Router}      from '@angular/router';
import {DxListComponent} from 'devextreme-angular';
import * as $ from 'jquery';

@Component({
    selector: 'app-reference-list',
    templateUrl: './reference-list.component.html',
    styleUrls: ['./reference-list.component.css']
})
export class ReferenceListComponent implements OnInit {

    @Input() links: Array<any>;
    @ViewChild("moneyList") list: DxListComponent;
    
    constructor() {}

    ngOnInit() {
    }
    
    groupTemplate(data: any) {
        return data.key;
    }
    itemTemplate(data: any) {
        return $("<a href='" + data.link + "'>" + data.title + "</a>");
    }
    
    collapseGroup (groupIndex: any) {
        this.list.instance.collapseGroup(groupIndex);
    }

}
