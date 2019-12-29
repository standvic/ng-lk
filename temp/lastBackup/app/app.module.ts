import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DxMenuModule,
        DxTextBoxModule,
        DxButtonModule,
        DxValidatorModule,
        DxDataGridModule,
        DxChartModule,
        DxTreeListModule,
        DxListModule,
        DxValidationSummaryModule } from 'devextreme-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './components/main/main.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MoneyDynamicBalanceComponent } from './components/money-dynamic-balance/money-dynamic-balance.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';

import { ThemeService } from './services/theme/theme.service';

//------------------------------------------------------- localization ----------------------------------------------
//import it to change locale and load localization messages
import { locale, loadMessages } from 'devextreme/localization'; 
import { DevExtremeModule } from 'devextreme-angular';
import 'devextreme-intl';
import { HeaderComponent } from './layout/header/header.component';

//Load localized messages (English included by default)
let  messagesRu = require("devextreme/localization/messages/ru.json");
  
loadMessages(messagesRu);
  
//Set locale according the browser language
locale(navigator.language);
//------------------------------------------------------- localization ----------------------------------------------

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MoneyDynamicBalanceComponent,
    SignInComponent,
    SignOutComponent,
    HeaderComponent,
   // NavMenuComponent
  ],
  imports: [
    AppRoutingModule,
    DxMenuModule,
    BrowserModule,
    //HttpClientModule,
    DxTextBoxModule,
    DxButtonModule,
    DxValidatorModule,
    DxDataGridModule,
    DxChartModule,
    DxTreeListModule,
    DxListModule,
    DxValidationSummaryModule
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }