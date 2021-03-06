import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { DxMenuModule,
        DxTextBoxModule,
        DxTextAreaModule,
        DxButtonModule,
        DxValidatorModule,
        DxDataGridModule,
        DxChartModule,
        DxTreeListModule,
        DxListModule,
        DxTreeMapModule,
        DxCircularGaugeModule,
        DxPopoverModule,
        DxDateBoxModule,
        DxRangeSelectorModule,
        DxPivotGridModule,
        DxPieChartModule,
        DxCheckBoxModule,
        DxPopupModule,
        DxSelectBoxModule,
        DxLoadPanelModule,
        DxDropDownBoxModule,
        DxTreeViewModule,
        DxSliderModule,
        DxValidationSummaryModule } from 'devextreme-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './views/main/main.component';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { MoneyDynamicBalanceComponent } from './views/money-dynamic-balance/money-dynamic-balance.component';
import { MoneyTurnoverComponent } from './views/money-turnover/money-turnover.component';
import {ProfitTrendsComponent} from './views/profit-trends/profit-trends.component'
import { SignOutComponent } from './views/sign-out/sign-out.component';
import 'devextreme-intl';
import { ThemeService } from './services/theme/theme.service';
import { DevExtremeModule } from 'devextreme-angular';
//------------------------------------------------------- localization ----------------------------------------------
//import it to change locale and load localization messages
import { locale, loadMessages } from 'devextreme/localization'; 
//-------------------------------------------------------------------------------------------------------------------
import { HeaderComponent } from './layout/header/header.component';
import { MoneyGridComponent } from './components/money-grid/money-grid.component';
import { AverageMoneyChartComponent } from './components/average-money-chart/average-money-chart.component';
import { CashFlowAnalysisChartComponent } from './components/cash-flow-analysis-chart/cash-flow-analysis-chart.component';
import { ReferenceListComponent } from './components/reference-list/reference-list.component';
import { AverageOperCashFlowTreelistComponent } from './components/average-oper-cash-flow-treelist/average-oper-cash-flow-treelist.component';
import { FinanceCycleChartComponent } from './components/finance-cycle-chart/finance-cycle-chart.component';
import { GrossProfitChartComponent } from './components/gross-profit-chart/gross-profit-chart.component';
import { GroupedProfitChartComponent } from './components/grouped-profit-chart/grouped-profit-chart.component';
import { ActiveBalanceTreeMapComponent } from './components/active-balance-tree-map/active-balance-tree-map.component';
import { PassiveBalanceTreeMapComponent } from './components/passive-balance-tree-map/passive-balance-tree-map.component';
import { GraceGaugeComponent } from './components/grace-gauge/grace-gauge.component';
import { GraceReceivableGaugeComponent } from './components/grace-receivable-gauge/grace-receivable-gauge.component';
import { GracePayableGaugeComponent } from './components/grace-payable-gauge/grace-payable-gauge.component';
import { CaptionComponent } from './components/caption/caption.component';
import { MoneyAccountReceivableComponent } from './views/money-account-receivable/money-account-receivable.component';
import { MoneyAccountReceivablePayableComponent } from './views/money-account-receivable-payable/money-account-receivable-payable.component';
import { ArrowButtonComponent } from './components/arrow-button/arrow-button.component';
import { RangeSelectorComponent } from './components/range-selector/range-selector.component';
import { MoneyAccountPivotgridComponent } from './components/money-account-pivotgrid/money-account-pivotgrid.component';
import { MoneyAccountPayableComponent } from './views/money-account-payable/money-account-payable.component';
import { MoneyAccountOutdatedPivotgridComponent } from './components/money-account-outdated-pivotgrid/money-account-outdated-pivotgrid.component';
import { DoughnutComponent } from './components/doughnut/doughnut.component';
import { MoneyOutdatedAccountReceivableComponent } from './views/money-outdated-account-receivable/money-outdated-account-receivable.component';
import { MoneyOutdatedAccountPayableComponent } from './views/money-outdated-account-payable/money-outdated-account-payable.component';
import { MoneyAccountOverdurePivotgridComponent } from './components/money-account-overdure-pivotgrid/money-account-overdure-pivotgrid.component';
import { MoneyAccountReceivableWithOverdureComponent } from './views/money-account-receivable-with-overdure/money-account-receivable-with-overdure.component';
import { MoneyAccountPayableWithOverdureComponent } from './views/money-account-payable-with-overdure/money-account-payable-with-overdure.component';
import { MoneyBalanceComponent } from './views/money-balance/money-balance.component';
import { MoneyAgentTurnoverComponent } from './views/money-agent-turnover/money-agent-turnover.component';
import { MoneyCheckoutTurnoverComponent } from './views/money-checkout-turnover/money-checkout-turnover.component';
import { MoneyCashBalanceComponent } from './views/money-cash-balance/money-cash-balance.component';
import { MoneyCustomerReturnsComponent } from './views/money-customer-returns/money-customer-returns.component';
import { MoneyDynamicChartComponent } from './components/money-dynamic-chart/money-dynamic-chart.component';
import { DirectButtonComponent } from './components/direct-button/direct-button.component';
import { PeriodButtonComponent } from './components/period-button/period-button.component';
import { AccountReceivableTurnoverReportComponent } from './views/account-receivable-turnover-report/account-receivable-turnover-report.component';
import { CompoundDataGridComponent } from './components/compound-data-grid/compound-data-grid.component';
import { PopupTurnoverContentComponent } from './components/popup-turnover-content/popup-turnover-content.component';
import { SuppliersAveragePaymentComponent } from './views/suppliers-average-payment/suppliers-average-payment.component';
import { ProfitAnalysisComponent } from './views/profit-analysis/profit-analysis.component';
import { MoneyExpensesComponent } from './views/money-expenses/money-expenses.component';
import { NetProfitComponent } from './views/net-profit/net-profit.component';
import { StockDynamicBalanceComponent } from './views/stock-dynamic-balance/stock-dynamic-balance.component';
import { StockBalanceComponent } from './views/stock-balance/stock-balance.component';
import { StockUnmarketableComponent } from './views/stock-unmarketable/stock-unmarketable.component';
import { PurchaseDeliveryDebtsTurnoverComponent } from './views/purchase-delivery-debts-turnover/purchase-delivery-debts-turnover.component';
import { ArticlesTurnoverComponent } from './views/articles-turnover/articles-turnover.component';
import { TaskGridComponent } from './views/task-grid/task-grid.component';
import { TaskCreateComponent } from './views/task-create/task-create.component';
import { TaskInfoComponent } from './views/task-info/task-info.component';
import { PartnerTaskGridComponent } from './views/partner-task-grid/partner-task-grid.component';
import { PartnerTaskCreateComponent } from './views/partner-task-create/partner-task-create.component';
import { PartnerTaskInfoComponent } from './views/partner-task-info/partner-task-info.component';
import { PayReqGridComponent } from './views/pay-req-grid/pay-req-grid.component';
import { PayReqInfoComponent } from './views/pay-req-info/pay-req-info.component';
import { ReworkIssueCommandComponent } from './components/rework-issue-command/rework-issue-command.component';
import { CoordinationIssueCommandComponent } from './components/coordination-issue-command/coordination-issue-command.component';
import { SendNotificationIssueCommandComponent } from './components/send-notification-issue-command/send-notification-issue-command.component';
import { ChangeDateIssueCommandComponent } from './components/change-date-issue-command/change-date-issue-command.component';
import { ApproveDateIssueCommandComponent } from './components/approve-date-issue-command/approve-date-issue-command.component';
import { NotRelevantIssueCommandComponent } from './components/not-relevant-issue-command/not-relevant-issue-command.component';
import { CompletedIssueCommandComponent } from './components/completed-issue-command/completed-issue-command.component';
import { InProgressIssueCommandComponent } from './components/in-progress-issue-command/in-progress-issue-command.component';

//------------------------------------------------------- localization ----------------------------------------------
// ----------- i18n ----------------------------------
//import {TranslateService} from '@ngx-translate/core';
//let translate: TranslateService;
//let browserLang = translate.getBrowserLang();
//console.log(browserLang);
// ----------- i18n ----------------------------------

//Load localized messages (English included by default)
let  messagesRu = require("devextreme/localization/messages/ru.json");
  
loadMessages(messagesRu);
  
//Set locale according the browser language
locale(navigator.language);
//------------------------------------------------------- localization ----------------------------------------------

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

export function createTranslateLoader(http: HttpClient) {
    //return new TranslateHttpLoader(http, './assets/i18n/', '.json');
    return new TranslateHttpLoader(http, "/demo/assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MoneyDynamicBalanceComponent,
    ProfitTrendsComponent,
    SignInComponent,
    SignOutComponent,
    HeaderComponent,
    MoneyGridComponent,
    AverageMoneyChartComponent,
    CashFlowAnalysisChartComponent,
    ReferenceListComponent,
    AverageOperCashFlowTreelistComponent,
    FinanceCycleChartComponent,
    GrossProfitChartComponent,
    GroupedProfitChartComponent,
    ActiveBalanceTreeMapComponent,
    PassiveBalanceTreeMapComponent,
    GraceGaugeComponent,
    GraceReceivableGaugeComponent,
    GracePayableGaugeComponent,
    CaptionComponent,
    MoneyAccountReceivableComponent,
    MoneyAccountReceivablePayableComponent,
    MoneyTurnoverComponent,
    ArrowButtonComponent,
    MoneyAccountPivotgridComponent,
    MoneyAccountPayableComponent,
    MoneyAccountOutdatedPivotgridComponent,
    MoneyOutdatedAccountReceivableComponent,
    RangeSelectorComponent,
    DoughnutComponent,
    MoneyOutdatedAccountPayableComponent,
    MoneyAccountOverdurePivotgridComponent,
    MoneyAccountReceivableWithOverdureComponent,
    MoneyAccountPayableWithOverdureComponent,
    MoneyBalanceComponent,
    MoneyTurnoverComponent,
    MoneyAgentTurnoverComponent,
    MoneyCheckoutTurnoverComponent,
    MoneyCashBalanceComponent,
    MoneyCustomerReturnsComponent,
    MoneyDynamicChartComponent,
    DirectButtonComponent,
    PeriodButtonComponent,
    AccountReceivableTurnoverReportComponent,
    CompoundDataGridComponent,
    PopupTurnoverContentComponent,
    SuppliersAveragePaymentComponent,
    ProfitAnalysisComponent,
    MoneyExpensesComponent,
    NetProfitComponent,
    StockDynamicBalanceComponent,
    StockBalanceComponent,
    StockUnmarketableComponent,
    PurchaseDeliveryDebtsTurnoverComponent,
    ArticlesTurnoverComponent,
    TaskGridComponent,
    TaskCreateComponent,
    TaskInfoComponent,
    PartnerTaskGridComponent,
    PartnerTaskCreateComponent,
    PartnerTaskInfoComponent,
    PayReqGridComponent,
    PayReqInfoComponent,
    ReworkIssueCommandComponent,
    CoordinationIssueCommandComponent,
    SendNotificationIssueCommandComponent,
    ChangeDateIssueCommandComponent,
    ApproveDateIssueCommandComponent,
    NotRelevantIssueCommandComponent,
    CompletedIssueCommandComponent,
    InProgressIssueCommandComponent
  ],
  imports: [
    FormsModule,
    AppRoutingModule,
    DxMenuModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    DxTextBoxModule,
    DxTextAreaModule,
    DxButtonModule,
    DxValidatorModule,
    DxDataGridModule,
    DxChartModule,
    DxTreeListModule,
    DxListModule,
    DxValidationSummaryModule,
    DxCircularGaugeModule,
    DxPopoverModule,
    DxDateBoxModule,
    DxTreeMapModule,
    DxPivotGridModule,
    DxRangeSelectorModule,
    DxPieChartModule,
    DxCheckBoxModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxLoadPanelModule,
    DxDropDownBoxModule,
    DxTreeViewModule,
    DxSliderModule
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }