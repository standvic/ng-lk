import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import DataSource from 'devextreme/data/data_source';
import { DxDataGridComponent } from "devextreme-angular";
import * as moment from "moment";
import 'moment/locale/ru';
import {RestClientService} from '../../services/rest-client/rest-client.service';

@Component({
    selector: 'app-task-info',
    templateUrl: './task-info.component.html',
    styleUrls: ['./task-info.component.css']
})
export class TaskInfoComponent implements OnInit {

    issue: any;
    id: number;
    subject: string;
    startDate: any;
    state: string;
    type: string;
    company: string;
    endDate: any;
    newEndDate: any;
    employee: string;
    content: string;
    comm: DataSource; 
    commentValue: string;
    loadingAddCommentVisible: boolean = false;
    loadingTaskInfoVisible: boolean = false;
    reworkVisible: boolean = false;
    sendNotificationVisible: boolean = false;
    changeDateVisible: boolean = false;
    approveDateVisible: boolean = false;
    notRelevantVisible: boolean = false;
    completedVisible: boolean = false;
    inProgressVisible: boolean = false;
    coordinationVisible: boolean = false;
    popupVisible: boolean = false;
    
    COORDINATION: number = 66843;
    INPROGRESS: number = 66851;
    VERIFICATION: number = 66855;
    REWORK: number = 66847;
    
    @ViewChild("comments") commentGrid: DxDataGridComponent;

    constructor(private activateRoute: ActivatedRoute) {
        this.id = this.activateRoute.snapshot.params['id'];
    }

    ngOnInit() {
        this.loadingTaskInfoVisible = true;
        let self = this;
        this.issue = new DataSource({
            load: function (loadOptions) {
                let params = {"Id": self.id};
                return RestClientService.get("GetIssue", params)
                    .done(function (result:any) {
                        self.subject = result.Subject;
                        self.startDate = moment(result.CreationDate).format('L');
                        self.state = result.SubTypeName;
                        self.type = result.TypeName;
                        self.company = result.FirmName;
                        self.endDate = moment(result.DeadlineDate).format('L');
                        if (result.NewDeadlineDate != null) {
                            self.newEndDate = moment(result.NewDeadlineDate).format('L');
                        };
                        self.employee = result.EmployeeName;
                        self.content = result.Content;
                        
                        self.comm = new DataSource({
                            load: function (loadOptions: any) { 
                                return result.Comments
                            }
                        });
                        self.comm.reload();
                        
                        self.loadingTaskInfoVisible = false;
                        switch (result.SubTypeId) {
                            case self.COORDINATION:
                                self.reworkVisible = true;
                                self.sendNotificationVisible = true;
                                self.changeDateVisible = true;
                                if (result.NewDeadlineDate != null) {
                                    self.approveDateVisible = true;
                                };
                                break;
                            case self.INPROGRESS:
                                self.notRelevantVisible = true;
                                self.sendNotificationVisible = true;
                                self.changeDateVisible = true;
                                self.approveDateVisible = true;
                                break;
                            case self.VERIFICATION:
                                self.completedVisible = true;
                                self.inProgressVisible = true;
                                self.sendNotificationVisible = true;
                                break;
                            case self.REWORK:
                                self.notRelevantVisible = true;
                                self.coordinationVisible = true;
                                break;
                            default:
                        }
                    });
            }
        });
    };
    
    commentValueChanged(e: any){
        this.commentValue = e.value;
    };
    
    buttonAddComment(e: any) {
        let self = this;
        this.loadingAddCommentVisible = true;
        let params = {  "IssueId": this.id,
                        "Comment": this.commentValue
                    };
        let post = RestClientService.get("AddIssueComment", params);
        post.done(function(p){
            let isDone = self.issue.reload();
            isDone.done(function (data: any){
                self.commentGrid.instance.repaint();
                self.loadingAddCommentVisible = false;
            });
        });
    };
    
    customizeText(options: any) {
        return !options.value ? '' : moment(options.value).format('L');
    };
}
