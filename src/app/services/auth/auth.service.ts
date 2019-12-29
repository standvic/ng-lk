import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap} from 'rxjs/operators';
import { RestClientService } from '../rest-client/rest-client.service';
import * as $ from "jquery";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    isLoggedIn = window.localStorage['Auth'];
    redirectUrl: string = 'main';    // store the URL so we can redirect after logging in
    queryResult: any;
    
    /*login(login:string, password:string): Promise<boolean> {
        let d = new $.Deferred();
        return RestClientService.get("SignInClientWithLogin", {Username: login, Password: password})
        .done(function (result:any) {
            if (result && result.Success) {
                RestClientService.get("GetWebUserSessionInfo", { Code: '' })
                .done(function (state:any) {
                    if (state.IsAuthenticated) {
                            if (!state.IsNewPasswordRequired) {
                                this.isLoggedIn = true; 
                            } else {
                                this.isLoggedIn =  false;
                            }
                    } else {
                        this.isLoggedIn =  false;
                    }
                });
            };
        });
        //console.log(this.queryResult.responseJSON);
        //return of(d.promise()).pipe(tap(val => this.isLoggedIn = d.promise()));
    }

    logout(): void {
        this.isLoggedIn = false;
    }*/
}
