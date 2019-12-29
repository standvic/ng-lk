import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import notify from 'devextreme/ui/notify';
import {Router} from '@angular/router';
import * as moment from "moment";
import 'moment/locale/ru';

@Component({
    selector: 'app-approve-date-issue-command',
    templateUrl: './approve-date-issue-command.component.html',
    styleUrls: ['./approve-date-issue-command.component.css']
})
export class ApproveDateIssueCommandComponent implements OnInit {

    @Input() id: any;
    @Input() approveDateVisible: boolean;
    newDate: any;
    popupVisible: boolean = false;
    date: any;
    commentValue: string;
    IsChanged: boolean = true;
    loadingPanelVisible: boolean = false;
    disabled: boolean = true;
    issue: any;

    constructor(public router: Router) {}

    ngOnInit() {
    };

    commentValueChanged(e: any) {
        this.commentValue = e.value;
    };
    
    approveDateButton (e: any) {
        let self = this;
        this.popupVisible = true;
        let params = {"Id": self.id}; 
        let post = RestClientService.get("GetIssue", params);
        post.done(function (result:any) {
            self.newDate = moment(result.NewDeadlineDate).format('L');
            self.date = self.newDate;
        });
    };

    okFunc() {
        let self = this;
        if (!this.commentValue && this.disabled == false) {
            notify('Комментарий обязателен!', 'warning', 4000);
            self.popupVisible = false;
            return;
        }
        let params = {
            "Id": this.id,
            "Target": "Issue",
            "Date": this.date,
            "IsChanged": this.IsChanged,
            "Comment": this.commentValue
        };
        this.loadingPanelVisible = true;
        let post = RestClientService.get('ApproveIssueCompletionDate', params);
        post.done(function (p) {
            self.loadingPanelVisible = false;
            self.popupVisible = false;
            notify('Уведомление отправлено!', 'info', 2000);
            setTimeout(function () {self.router.navigate(['taskGrid']);}, 2000);
        });
    };

    cancelFunc() {
        this.popupVisible = false;
    };
    
    onCheckBoxValueChanged(e: any) {
        if (e.value == true) {
            this.date = new Date();
            this.IsChanged = true;
            this.disabled = false;
        }
        else {
            //this.date = this.newDate;
            this.commentValue = null;
            this.IsChanged = false;
            this.disabled = true;
        }
    };

}
