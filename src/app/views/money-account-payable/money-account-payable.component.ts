import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-money-account-payable',
    templateUrl: './money-account-payable.component.html',
    styleUrls: ['./money-account-payable.component.css']
})
export class MoneyAccountPayableComponent implements OnInit {

    gridDate: Date = new Date();

    constructor() {}

    ngOnInit() {
    }

}
