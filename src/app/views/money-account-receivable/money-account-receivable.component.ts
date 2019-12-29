import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-money-account-receivable',
    templateUrl: './money-account-receivable.component.html',
    styleUrls: ['./money-account-receivable.component.css']
})
export class MoneyAccountReceivableComponent implements OnInit {

    gridDate: Date = new Date();

    constructor() {}

    ngOnInit() {
    }

}
