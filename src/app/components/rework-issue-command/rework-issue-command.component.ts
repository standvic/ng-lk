import {Component, OnInit, Input} from '@angular/core';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import notify from 'devextreme/ui/notify';
import {Router} from '@angular/router';

@Component({
    selector: 'app-rework-issue-command',
    templateUrl: './rework-issue-command.component.html',
    styleUrls: ['./rework-issue-command.component.css']
})
export class ReworkIssueCommandComponent implements OnInit {

    @Input() id: any;
    @Input() title: string;
    @Input() reworkVisible: boolean;
    popupVisible: boolean = false;
    loadingPanelVisible: boolean = false;

    commentValue: string;

    constructor(public router: Router) {}

    ngOnInit() {
    };

    commentValueChanged(e: any) {
        this.commentValue = e.value;
    };
    
    reworkButton (e: any) {
        this.popupVisible = true;
    };

    okFunc() {
        let self = this;
        if (!this.commentValue) {
            notify('Комментарий обязателен!', 'warning', 4000);
            self.popupVisible = false;
            return;
        }
        let params = {
            "Id": this.id,
            "Target": "Issue",
            "Comment": this.commentValue
        };
        let post = RestClientService.get('ReworkIssue', params);
        this.loadingPanelVisible = true;
        post.done(function (p) {
            self.loadingPanelVisible = false;
            self.popupVisible = false;
            notify('Задача отправлена на доработку!', 'info', 2000);
            setTimeout(function () {self.router.navigate(['taskGrid']);}, 2000);
        });
    };

    cancelFunc() {
        this.popupVisible = false;
    };

}
