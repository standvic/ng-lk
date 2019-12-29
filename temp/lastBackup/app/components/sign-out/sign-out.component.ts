import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import { UserStore, UserStoreService } from '../../services/user-store/user-store.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {

    store: UserStore;
    constructor(public router: Router, storeService: UserStoreService) { 
        this.store = storeService.getUserStore();
    }

    ngOnInit() {
        //window.localStorage['Auth'] = false;
        //this.router.navigate(['signIn']); 
        //this.store.setOption('Authenticated', false); 
        localStorage.clear();
        window.location.href = 'signIn';
    }

}
