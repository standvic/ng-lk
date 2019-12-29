import { Component } from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { RestClientService } from '../../services/rest-client/rest-client.service';
import { UserStore, UserStoreService } from '../../services/user-store/user-store.service';
import notify from 'devextreme/ui/notify';
import * as $ from 'jquery';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent{
    message: string;
    userName = "";
    password = "";
    //globalRouter: any;
    //globalStore: UserStore;
    
    constructor(public authService: AuthService, public router: Router, storeService: UserStoreService) {
        /*$.getJSON("assets/config/default.json", function (data: any) {
            window.localStorage['Configuration'] = JSON.stringify(data);
        });*/
    }

    setMessage() {
        this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
    }
    
    onClick() {
        let self = this;
        RestClientService.get("SignInClientWithLogin", {Username: this.userName, Password: this.password})
        .done(function (result:any) {
            if (result && result.Success) {
                RestClientService.get("GetWebUserSessionInfo", { Code: '' })
                .done(function (state:any) {
                    if (state.IsAuthenticated) {
                            if (!state.IsNewPasswordRequired) {
                                window.localStorage['Auth'] = true;
                                window.localStorage['FileStore'] = 'fstore/';
                                //localStore.setOption('Authenticated', true); 
                                //self.router.navigate(['main']); 
                                window.location.href = '';
                            } else {
                            }
                    } else {
                        notify("Логин или пароль указаны неверно", "warning", 600);
                    }
                });
            };
        });
    }
}
