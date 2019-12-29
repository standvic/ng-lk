import {Component, OnInit} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import { Router }      from '@angular/router';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import * as $ from 'jquery';

@Component({
    selector: 'app-task-create',
    templateUrl: './task-create.component.html',
    styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
    
    issueTypes: any;
    firms: any;
    disableSwitch: boolean;
    typeIssueInstance: any;
    firmInstance: any;
    typeIssueValue: any;
    firmValue: any;
    subjectValue: any;
    contentValue: any;
    loadingVisible: boolean = false;

    constructor(public router: Router) {}

    ngOnInit() {
        this.issueTypes = new DataSource({
            load: function (loadOptions) {
                return RestClientService.get("GetIssueTypes", {});
            }
        });
        this.firms = new DataSource({
            load: function (loadOptions) {
                return RestClientService.get("GetFirms", {});
            }
        });
    }
    
    issueTypeValueChanged(e){
        this.typeIssueValue = e.value;
        let typeIssueArray = this.issueTypes.items();
        if (typeIssueArray != null){
            for (var i = 0;i<typeIssueArray.length;i++){
                if (typeIssueArray[i].Id == this.typeIssueValue){
                    this.disableSwitch = !typeIssueArray[i].IsFirmRequired;
                }
            }
        };
        this.firmInstance.option('disabled', this.disableSwitch);
        this.firmInstance.repaint();
    }
    
    firmValueChanged(e){
        this.firmValue = e.value;
    }
    
    subjectValueChanged(e){
        this.subjectValue = e.value;
    }
    
    contentValueChanged(e){
        this.contentValue = e.value;
    }
    
    typeIssueInstanceTransition(e){
        this.typeIssueInstance = e.component;  
    };
    
    firmInstanceTransition(e){
      this.firmInstance = e.component;  
    };
    
    buttonCreateIssue(e){
        let self = this;
        if(this.typeIssueValue == undefined){
            return notify('ВЫБЕРИТЕ ВИД ЗАДАЧИ!','error',3000);
        };
        if(this.subjectValue == undefined){
            return notify('ВВЕДИТЕ ТЕМУ!','error',3000);
        };
        if(this.contentValue == undefined){
            return notify('ЗАПОЛНИТЕ СОДЕРЖАНИЕ!','error',3000);
        };
        
        this.loadingVisible = true;
            
        var params = {  "FirmId": this.firmValue,
                        "Subject": this.subjectValue,
                        "Content": this.contentValue,
                        "TypeId": this.typeIssueValue
                    };
        RestClientService.get("CreateIssue", params)
            .done(function (result) {
                this.loadingVisible = false;
                if (result.error) {
                    notify('Ошибка!','error',2000);
                }
                else {
                    notify('Задача поставлена!','success',2000);
                }
                setTimeout(function (){self.router.navigate(['taskGrid']);},2000);
            });
    };
}
