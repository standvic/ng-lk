import {Component, OnInit, Input} from '@angular/core';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import notify from 'devextreme/ui/notify';
import {Router} from '@angular/router';

@Component({
    selector: 'app-completed-issue-command',
    templateUrl: './completed-issue-command.component.html',
    styleUrls: ['./completed-issue-command.component.css']
})
export class CompletedIssueCommandComponent implements OnInit {

    @Input() id: any;
    @Input() title: string;
    @Input() completedVisible: boolean;
    popupVisible: boolean = false;
    loadingPanelVisible: boolean = false;

    commentValue: string;

    constructor(public router: Router) {}

    ngOnInit() {
    };

    commentValueChanged(e: any) {
        this.commentValue = e.value;
    };
    
    completedButton(e: any) {
        this.loadingPanelVisible = true;
        let self = this;
        let params = {
            "Id": this.id,
            "Target": "Issue"
        };
        let post = RestClientService.get('IssueCompleted', params);
        post.done(function (p) {
            self.loadingPanelVisible = false;
            notify('Задача выполнена!', 'info', 2000);
            setTimeout(function () {self.router.navigate(['taskGrid']);}, 2000);
        });
    };
}
