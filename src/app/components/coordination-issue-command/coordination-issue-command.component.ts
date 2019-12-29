import {Component, OnInit, Input} from '@angular/core';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import notify from 'devextreme/ui/notify';
import {Router} from '@angular/router';

@Component({
    selector: 'app-coordination-issue-command',
    templateUrl: './coordination-issue-command.component.html',
    styleUrls: ['./coordination-issue-command.component.css']
})
export class CoordinationIssueCommandComponent implements OnInit {
    
    @Input() id: any;
    @Input() serviceName: string;
    @Input() coordinationVisible: boolean;
    loadingPanelVisible: boolean = false;

    constructor(public router: Router) {}

    ngOnInit() {
    };
    
    coordinationButton(e: any) {
        this.loadingPanelVisible = true;
        let self = this;
        let params = {
            "Id": this.id,
            "Target": "Issue"
        };
        let post = RestClientService.get(this.serviceName, params);
        post.done(function (p) {
            self.loadingPanelVisible = false;
            notify('Задача отправлена на согласование!', 'info', 2000);
            setTimeout(function () {self.router.navigate(['taskGrid']);}, 2000);
        });
    };

}
