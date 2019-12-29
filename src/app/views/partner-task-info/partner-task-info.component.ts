import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import DataSource from 'devextreme/data/data_source';
import { DxDataGridComponent } from "devextreme-angular";
import * as moment from "moment";
import 'moment/locale/ru';
import {RestClientService} from '../../services/rest-client/rest-client.service';

@Component({
    selector: 'app-partner-task-info',
    templateUrl: './partner-task-info.component.html',
    styleUrls: ['./partner-task-info.component.css']
})
export class PartnerTaskInfoComponent implements OnInit {

    partnerIssue: any;
    id: number;
    subject: string;
    startDate: any;
    state: string;
    type: string;
    partner: string;
    endDate: any;
    contract: string;
    content: string;
    comm: DataSource;
    commentValue: string;
    loadingAddCommentVisible: boolean = false;
    loadingTaskInfoVisible: boolean = false;

    @ViewChild("comments") commentGrid: DxDataGridComponent;
    
    constructor(private activateRoute: ActivatedRoute) {
        this.id = this.activateRoute.snapshot.params['id'];
    }

    ngOnInit() {
        this.loadingTaskInfoVisible = true;
        let self = this;
        this.partnerIssue = new DataSource({
            load: function (loadOptions) {
                let params = {"Id": self.id};
                return RestClientService.get("GetPartnerIssue", params)
                    .done(function (result:any) {
                        self.subject = result.Subject;
                        self.startDate = moment(result.CreationDate).format('L');
                        self.state = result.SubTypeName;
                        self.type = result.TypeName;
                        self.partner = result.PartnerName;
                        self.endDate = moment(result.DeadlineDate).format('L');
                        self.contract = result.ContractNumber;
                        self.content = result.Content;
                        
                        self.comm = new DataSource({
                            load: function (loadOptions: any) { 
                                return result.Comments
                            }
                        });
                        self.comm.reload();
                        self.loadingTaskInfoVisible = false;
                    });
            }
        });
    }
    
    commentValueChanged(e: any){
        this.commentValue = e.value;
    };
    
    buttonAddComment(e: any) {
        let self = this;
        this.loadingAddCommentVisible = true;
        let params = {  "PartnerIssueId": this.id,
                        "Comment": this.commentValue
                    };
        let post = RestClientService.get("AddPartnerIssueComment", params);
        post.done(function(p){
            let isDone = self.partnerIssue.reload();
            isDone.done(function (data: any){
                self.commentGrid.instance.repaint();
                self.loadingAddCommentVisible = false;
            });
        });
    };
    
    customizeText(options: any) {
        return !options.value ? '' : moment(options.value).format('L');
    }

}
