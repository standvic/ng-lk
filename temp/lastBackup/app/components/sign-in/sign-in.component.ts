import { Component } from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { RestClientService } from '../../services/rest-client/rest-client.service';
import { UserStore, UserStoreService } from '../../services/user-store/user-store.service';
import notify from 'devextreme/ui/notify';

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
        //this.globalRouter = this.router;
        //this.globalStore = storeService.getUserStore();
    }

    setMessage() {
        this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
    }
    
    onClick() {
        //let localRouter: Router = this.globalRouter;
        //let localStore: UserStore = this.globalStore;
        RestClientService.get("SignInClientWithLogin", {Username: this.userName, Password: this.password})
        .done(function (result:any) {
            if (result && result.Success) {
                RestClientService.get("GetWebUserSessionInfo", { Code: '' })
                .done(function (state:any) {
                    if (state.IsAuthenticated) {
                            if (!state.IsNewPasswordRequired) {
                                window.localStorage['Auth'] = true;
                                //localStore.setOption('Authenticated', true); 
                                //localRouter.navigate(['main']); 
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
