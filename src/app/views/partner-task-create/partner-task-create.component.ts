import {Component, OnInit, ViewChild} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import {DxTreeViewComponent} from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import {Router} from '@angular/router';
import {RestClientService} from '../../services/rest-client/rest-client.service';
import * as $ from 'jquery';

@Component({
    selector: 'app-partner-task-create',
    templateUrl: './partner-task-create.component.html',
    styleUrls: ['./partner-task-create.component.css']
})
export class PartnerTaskCreateComponent implements OnInit {
    
    partners: DataSource;
    contracts: DataSource;
    treeListStore: DataSource;
    
    partnersInstance: any;
    contractsInstance: any;
    partnersValue: string;
    contractsValue: string;
    subjectValue: string;
    contentValue: string;
    @ViewChild(DxTreeViewComponent) treeView;
    treeBoxValue: any;
    
    loadingVisible: boolean = false;
    
    /*syncTreeViewSelection = function(treeView: any, value: any){
        if (!value) {
            treeView.unselectAll();
        } else {
            treeView.selectItem(value);
        }
    };*/

    constructor(public router: Router) {}

    ngOnInit() {
        let self = this;
        this.partners = new DataSource({
            load: function (loadOptions) {
                return RestClientService.get("GetPartners", {});
            }
        });
        this.contracts = new DataSource({
            load: function (loadOptions) {
                var contractsParams = {"PartnerId": self.partnersValue};
                return RestClientService.get("GetContracts",contractsParams);
            }
        });

        this.treeListStore = new DataSource({
                load: function (loadOptions) {
                    return RestClientService.get("GetPartnerIssueGroupTypes", {});
                },
                byKey: function (key) {
                         return key;
                     }
            });
    }
    
    syncTreeViewSelection(e: any) {
        if (!this.treeView) return;

        if (!this.treeBoxValue) {
            this.treeView.instance.unselectAll();
        } else {
            this.treeView.instance.selectItem(this.treeBoxValue);
        }
    }
    
    itemSelectionChanged(e){
        this.treeBoxValue = e.component.getSelectedNodesKeys()[0];
        //this.treeBoxValue = e.node.key;
        //console.log(this.treeBoxValue);
    };
    
    partnersValueChanged(e: any){
        this.partnersValue = e.value;
        this.contracts.reload();
        this.contractsInstance.option('disabled', false);
        this.contractsInstance.repaint();
    };
    
    contractsValueChanged(e:any){
        this.contractsValue = e.value;
    };
    
    subjectValueChanged(e: any){
        this.subjectValue = e.value;
    };
    
    contentValueChanged(e: any){
        this.contentValue = e.value;
    };

    partnersInstancing(e: any){
      this.partnersInstance = e.component;  
    };
    
     contractsInstancing(e: any){
      this.contractsInstance = e.component;  
    };
    
    buttonCreatePartnerIssue(e: any) {
        let self = this;
    if(this.partnersValue == undefined){
            return notify('ВЫБЕРИТЕ ПАРТНЕРА!','error',3000);
        };
        if(this.contractsValue == undefined){
            return notify('ВЫБЕРИТЕ КОНТРАКТ!','error',3000);
        };
        if(this.treeBoxValue == undefined){
            return notify('ВЫБЕРИТЕ ВИД ЗАДАЧИ!','error',3000);
        };
        if(this.subjectValue == undefined){
            return notify('ВВЕДИТЕ ТЕМУ!','error',3000);
        };
        if(this.contentValue == undefined){
            return notify('ЗАПОЛНИТЕ СОДЕРЖАНИЕ!','error',3000);
        };
        
        this.loadingVisible = true;
        
        var params = {  "PartnerId": this.partnersValue,
                        "ContractId": this.contractsValue,
                        "Subject": this.subjectValue,
                        "Content": this.contentValue,
                        "TypeId": this.treeBoxValue
                    };
        RestClientService.get("CreatePartnerIssue", params)
            .done(function (result) {
                if (result.error) {
                    notify('Ошибка!','error',2000);
                }
                else {
                    notify('Задача поставлена!','success',2000);
                }
                setTimeout(function (){self.router.navigate(['partnerTaskGrid']);},2000);
            });
    };

}
