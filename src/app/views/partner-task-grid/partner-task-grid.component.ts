import {Component, OnInit} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import {Router} from '@angular/router';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import {DateUtilsService} from '../../services/date-utils/date-utils.service';
import * as numeral from 'numeral';
import 'numeral/locales/ru';
import * as moment from "moment";
import 'moment/locale/ru';
import * as $ from 'jquery';

@Component({
    selector: 'app-partner-task-grid',
    templateUrl: './partner-task-grid.component.html',
    styleUrls: ['./partner-task-grid.component.css']
})
export class PartnerTaskGridComponent implements OnInit {

    gridDataSource: any;
    columns: any = [{
                dataField: 'Id',
                caption: 'Номер',
                cellTemplate: 'cellTemplate'
            }, {
                dataField: 'CreationDate',
                caption: 'Дата создания',
                dataType: 'date',
                customizeText: function (options) {
                    return !options.value ? "" : moment(options.value).format("L");
                }
            }, {
                dataField: 'SubTypeName',
                caption: 'Статус'
            }, {
                dataField: 'TypeName',
                caption: 'Вид задачи',
                validationRules: [{ type: 'required' }]
            }, {
                dataField: 'PartnerName',
                caption: 'Партнёр',
                validationRules: [{ type: 'required' }]
            }, {
                dataField: 'PartnerExecutorName',
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
            }, {
                dataField: 'ContractNumber',
                caption: 'Контракт'
            }];
    
    constructor(public router: Router) {}

    ngOnInit() {
        this.gridDataSource = new DataSource({
            load: function (loadOptions) {
                return RestClientService.get("GetPartnerIssues",{});
            }        
        });
    }

    buttonClick(e: any) {
        this.router.navigate(['partnerTaskCreate']);
    }
    
    onRowClick(e: any) {
       // this.router.navigate(['taskInfo']);
    }

}
