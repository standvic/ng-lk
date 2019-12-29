import {Component, OnInit, Input} from '@angular/core';
import {RestClientService} from '../../services/rest-client/rest-client.service';

@Component({
    selector: 'app-comment-popup',
    templateUrl: './comment-popup.component.html',
    styleUrls: ['./comment-popup.component.css']
})
export class CommentPopupComponent implements OnInit {

    @Input() id;
    @Input() title: string;
    @Input() serviceName: string;
    @Input() popupVisible: boolean;
    
    commentValue: string;
    
    constructor() {}

    ngOnInit() {
    };
    
    commentValueChanged(e: any){
        this.commentValue = e.value;
    };
    
    okFunc() {
        let self = this;
        let params = {  "IssueId": this.id,
                        "Comment": this.commentValue
                    };
        let post = RestClientService.get(this.serviceName, params);
        post.done(function(p){
            self.popupVisible = false;
        });
    };
    
    cancelFunc() {
        this.popupVisible = false;
    };
}
