import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MenuService } from './services/menu/menu.service';
import config from 'devextreme/core/config';

import { locale, loadMessages } from 'devextreme/localization';
import 'devextreme-intl';

import { ThemeService } from './services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css'],
  providers: [MenuService]
})
export class AppComponent {
    mainMenu: MenuItem[];
    authorized: boolean = window.localStorage['Auth'] ? true : false;
    newItems: any;
    selectedItem: any;
    
    constructor(menuService: MenuService, private router: Router, private themeService: ThemeService) {
        
        //loadMessages(ruMessages);
        //locale(navigator.language || navigator.browserLanguage)
        
        config({thousandsSeparator: ' '});
        this.mainMenu = menuService.getMenuItems();
        this.selectedItem = this.mainMenu[0];
        this.selectedItem.selected = true;
    }
    
    ngOnInit() {
        this.themeService.applyTheme();
    }
    
    itemClick(data: any) {
        //let item = data.itemData;
        this.selectedItem = data.itemData;
        if(this.selectedItem.id) {
            this.newItems = data.itemData.items;
            this.selectedItem.selected = true;
        }
        if (this.selectedItem.urlSrc){
            this.router.navigate([this.selectedItem.urlSrc]);
        }
    }
}
