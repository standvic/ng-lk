import {Component, OnInit, Input} from '@angular/core';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import notify from 'devextreme/ui/notify';
import {Router} from '@angular/router';

@Component({
  selector: 'app-send-notification-issue-command',
  templateUrl: './send-notification-issue-command.component.html',
  styleUrls: ['./send-notification-issue-command.component.css']
})
export class SendNotificationIssueCommandComponent implements OnInit {

    @Input() id: any;
    @Input() title: string;
    @Input() sendNotificationVisible: boolean;
    popupVisible: boolean = false;
    employees: DataSource;//any[] = [];
    items: any[] = [];
    selectedItems: any[] = [];
    empIds: any[] = [];
    commentValue: string;
    loadingPanelVisible: boolean = false;

    constructor(public router: Router) {}

    ngOnInit() {
    };

    commentValueChanged(e: any) {
        this.commentValue = e.value;
    };
    
    sendNotificationButton (e: any) {
        let self = this;
        this.items = [];
        RestClientService.get("GetEmployees", {})
            .done(function (result: any) {
                for (var n in result) {
                    self.items.push({id:"",text:""})
                    self.items[n].id = result[n].Id;
                    self.items[n].text = result[n].Name;
                };
                self.employees = new DataSource({
                    store: new ArrayStore({
                        key: "id",
                        data: self.items
                    })
                });
            });
        this.popupVisible = true;
    };

    okFunc() {
        for (var i in this.selectedItems) {
            this.empIds[i] = this.selectedItems[i].id;
        }
        let self = this;
        if (!this.commentValue) {
            notify('Комментарий обязателен!', 'warning', 4000);
            self.popupVisible = false;
            return;
        }
        let params = {
            "Id": this.id,
            "Target": "Issue",
            "Employees": this.empIds,
            "Comment": this.commentValue
        };
        this.loadingPanelVisible = true;
        let post = RestClientService.get('SendNotification', params);
        post.done(function (p) {
            self.loadingPanelVisible = false;
            self.popupVisible = false;
            notify('Уведомление отправлено!', 'info', 2000);
            //setTimeout(function () {self.router.navigate(['taskGrid']);}, 2000);
        });
    };

    cancelFunc() {
        this.popupVisible = false;
    };

}
