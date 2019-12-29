import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { MenuItem, MenuService } from './services/menu/menu.service';
import config from 'devextreme/core/config';
import {TranslateService} from '@ngx-translate/core';

import { locale, loadMessages } from 'devextreme/localization';
import 'devextreme-intl';

import { ThemeService } from './services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css'],
 // providers: [MenuService]
})
export class AppComponent {
   // mainMenu: MenuItem[];
    authorized: boolean = window.localStorage['Auth'] ? true : false;
    newItems: any;
    selectedItem: any;
    
    constructor(/*menuService: MenuService,*/ private router: Router, private themeService: ThemeService, private translate: TranslateService) {
        
//----------------------------------------------------------------------- i18n ---------------------------------------------
        translate.addLangs(["en", "ru"]);
        translate.setDefaultLang('ru');

        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
//---------------------------------------------------------------------------------------------------------------------------        
        //loadMessages(ruMessages);
        //locale(navigator.language || navigator.browserLanguage)
        
        config({thousandsSeparator: ' '});
        config({ defaultCurrency: 'RUB' });
        //this.mainMenu = menuService.getMenuItems();
        //this.selectedItem = this.mainMenu[0];
        //this.selectedItem.selected = true;
    }
    
    ngOnInit() {
        if(this.authorized) {
            //this.router.navigate(['main']);
        }
        else {
            this.router.navigate(['signIn']);
        }
        //this.themeService.applyTheme();
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
