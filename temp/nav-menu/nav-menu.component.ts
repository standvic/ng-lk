import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MenuService } from '../../services/menu/menu.service';

@Component({
    selector: 'nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css'],
    providers: [MenuService]
})
export class NavMenuComponent implements OnInit {
    mainMenu: MenuItem[];
    newItems: any;
    selectedItem: any;
    showSubmenuModes: any;
    showFirstSubmenuModes: any;
    
    constructor(service: MenuService, private router: Router) {
    this.mainMenu = service.getMenuItems();
    //this.selectedItem = this.mainMenu[0];
    
    this.showSubmenuModes = [{
            name: "onHover",
            delay: { show: 0, hide: 500 }
        }, {
            name: "onClick",
            delay: { show: 0, hide: 300 }
        }];
        this.showFirstSubmenuModes = this.showSubmenuModes[1];
    }

    ngOnInit() {
    }

    itemClick(data: any) {
          let item = data.itemData;
          if(item.id) {
              this.newItems = data.itemData.items
              this.selectedItem = true;
          }
          if(item.urlSrc) {
              this.router.navigate([item.urlSrc])
          }
      }

}
