import { Injectable } from '@angular/core';
import { Router }      from '@angular/router';
import * as $ from 'jquery';
@Injectable({
  providedIn: 'root'
})

export ﻿class RestClientService
{
    //constructor( public router: Router) {
    //}
    static router: Router;
    //static object = JSON.parse(window.localStorage['Configuration']);
    static appHost: string = 'http://localhost:3000/';//RestClientService.object.AppService.URL;
    //static appHost: string = '/test/api/';
    static get(method: string, params: any) {
        //console.log(RestClientService.appHost);
        let self = this;
    	//var object = JSON.parse(window.localStorage['Configuration']);
        return $.ajax({
            url: self.appHost + method,//object.AppService.URL + '/' + method,
            method: 'POST',
            data: {
                parameters: JSON.stringify(params)
            },
            dataFilter: function(response: any) {
            	var returnResponse = response;
            	var responseObject = $.parseJSON(response);
            	if (responseObject.hasOwnProperty('JsonString')) {
            		var jsonString =  $.parseJSON(responseObject.JsonString);            		 
                	returnResponse = JSON.stringify(jsonString._v);                 	
            	}   
            	return returnResponse;
            },
            xhrFields: { withCredentials: true },
        })
        .fail(this.failFunc);
    }
    
    static getFile(method: string, params: any) {
        let self = this;
    	//var object = JSON.parse(window.localStorage['AppService']);
        return $.ajax({
            url: self.appHost + 'getfile/' + method,//object.AppService.URL + '/getfile/' + method,
            method: 'POST',
            data: {
                parameters: JSON.stringify(params)
            },
            xhrFields: { withCredentials: true },
        })
        .fail(this.failFunc);
    };
    
    static failFunc(jqXHR: any, textStatus: string, errorThrown: any){
        let self = this;
        var errorCode = jqXHR.responseJSON && jqXHR.responseJSON.ultimaErrorCode ? jqXHR.responseJSON.ultimaErrorCode : 0;
            // auth error
        if (errorCode === 100) {
            if (window.localStorage['Auth']) {
                localStorage.clear();
                jqXHR.abort();
                //window.location.href = 'signIn';
                self.router.navigate(['signIn']);
            }
            return;
        }
        else if (errorCode === 200) {
            //FlashStore.store('sendCode', true);
            jqXHR.abort();
            //BgiApp.app.navigate({ view: 'messageSignIn', backUri: BgiApp.app.currentUri });
            return;
        }
        var text = 'Внутренняя ошибка';
        if (jqXHR.responseJSON && jqXHR.responseJSON.error) {
            text = jqXHR.responseJSON.error;
        }
        /*DevExpress.ui.dialog.alert({
            title: 'Ошибка',
            message: text
        });*/
        jqXHR.abort();
    };
}
