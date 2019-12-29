import {Component, OnInit} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { Router }      from '@angular/router';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import {DateUtilsService} from '../../services/date-utils/date-utils.service';
import * as numeral from 'numeral';
import 'numeral/locales/ru';
import * as moment from "moment";
import 'moment/locale/ru';
import * as $ from 'jquery';

@Component({
    selector: 'app-task-grid',
    templateUrl: './task-grid.component.html',
    styleUrls: ['./task-grid.component.css']
})
export class TaskGridComponent implements OnInit {
    
    gridDataSource: any;
    subTypeId: any;
    columns: any = [{
                dataField: 'Id',
                caption: 'Номер',
                cellTemplate: 'cellTemplate'
            },  {
                dataField: 'CreationDate',
                caption: 'Дата создания',
                dataType: 'date',
                customizeText: function (options) {
                    return !options.value ? "" : moment(options.value).format("L");
                }
            },  {
                dataField: 'SubTypeName',
                caption: 'Статус'
            }, {
                dataField: 'DepartmentName',
                caption: 'Отдел'
            }, {
                dataField: 'TypeName',
                caption: 'Вид задачи',
                validationRules: [{ type: 'required' }]
            }, {
                dataField: 'ResponsibleEmployeeName',
                caption: 'Ответственный',
                validationRules: [{ type: 'required' }]
            }, {
                dataField: 'WorkingEmployeeName',
                caption: 'Исполнитель',
                validationRules: [{ type: 'required' }]
            }, {
                dataField: 'DeadlineDate',
                caption: 'Дата выполнения',
                dataType: 'date',
                customizeText: function (options) {
                    return !options.value ? "" : moment(options.value).format("L");
                }
            }, {
                dataField: 'Subject',
                caption: 'Тема'
            }];

    constructor(public router: Router) {}

    ngOnInit() {
        let self = this;
        this.gridDataSource = new DataSource({
            load: function (loadOptions) {
                return RestClientService.get("GetIssues",{})
                .done(function (result:any) {
                });
            }        
        });
    }

    buttonClick(e: any) {
        this.router.navigate(['taskCreate']); 
    }
    
    onRowClick(e: any) {
       // this.router.navigate(['taskInfo']);
    }
}
