import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import notify from 'devextreme/ui/notify';
import {Router} from '@angular/router';
import * as moment from "moment";
import 'moment/locale/ru';

@Component({
  selector: 'app-change-date-issue-command',
  templateUrl: './change-date-issue-command.component.html',
  styleUrls: ['./change-date-issue-command.component.css']
})
export class ChangeDateIssueCommandComponent implements OnInit {

    @Input() id: any;
    @Input() changeDateVisible: boolean;
    popupVisible: boolean = false;
    date: Date = new Date();
    commentValue: string;
    loadingPanelVisible: boolean = false;
    currentDate: any;
    minDate: Date;
    disDates: any[] = [];
    startDay: any;
    endDay: any;

    constructor(public router: Router) {
        //this.disDates = [new Date(2018,7,15),  new Date(2018,7,16), new Date(2018,7,17) ];
        //this.disDates = this.getDates(new Date(2018,0,1), new Date());
        //console.log(this.disDates);
        
        this.startDay = new Date("01/01/2018");
        this.endDay  = new Date();//boxingDay*1 + 7*24*3600*1000;
        this.disDates = this.getDates2( this.startDay, this.endDay );
        console.log(this.disDates);
    }

    ngOnInit() {
        let self = this;
        let params = {"Id": self.id}; 
        let post = RestClientService.get("GetIssue", params);
        post.done(function (result:any) {
            self.currentDate = moment(result.DeadlineDate).format('L');
            if(self.currentDate <=  new Date()) {
                self.endDay = new Date;
            }
            else {
               self.minDate = self.currentDate;
            }
       });
    };

    commentValueChanged(e: any) {
        this.commentValue = e.value;
    };
    
    changeDateButton (e: any) {
        let self = this;
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
            "Date": this.date,
            "Comment": this.commentValue
        };
        this.loadingPanelVisible = true;
        let post = RestClientService.get('ChangeIssueCompletionDate', params);
        post.done(function (p) {
            self.loadingPanelVisible = false;
            self.popupVisible = false;
            notify('Дата выполнения изменена!', 'info', 2000);
            setTimeout(function () {self.router.navigate(['taskGrid']);}, 2000);
        });
    };

    cancelFunc() {
        this.popupVisible = false;
    };
    
    isValidDate(args) {
        let dayOfWeek = args.date.getDay(),
            day = (dayOfWeek < new Date() );
        return day;            
    };
    makeDisableDates() {
        //let aDay = new Date();
        //let currentYear = aDay.getFullYear();
        //let originYear = currentYear - 100;
        //console.log(new Date(originYear, 0,1));
    };  
    notAllowedDates(args: any) {
       // console.dir(args);
        //let dayOfWeek = args.date.getDay();
    };
    
    getDates(startDate: any, stopD: any) {
        let dateArray = [];
        let currentDate = moment(startDate);
        let stopDate = moment(stopD);
        while (currentDate <= stopDate) {
            dateArray.push( moment(currentDate).format('llll') )
            //dateArray.push(currentDate);
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    };
    
    getDates2( d1, d2 ){
        var oneDay = 24*3600*1000;
        for (var d=[],ms=d1*1,last=d2*1;ms<last;ms+=oneDay){
          d.push( new Date(ms) );
        }
        return d;
      }

}
