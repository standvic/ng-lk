import { Routes } from '@angular/router'; 
import { 
    MainComponent, SignInComponent, SignOutComponent, MoneyAccountReceivablePayableComponent, MoneyDynamicBalanceComponent,
    MoneyAccountReceivableComponent, MoneyAccountPayableComponent, ProfitTrendsComponent, MoneyOutdatedAccountReceivableComponent,
    MoneyOutdatedAccountPayableComponent, MoneyAccountReceivableWithOverdureComponent, MoneyAccountPayableWithOverdureComponent,
    MoneyBalanceComponent, MoneyTurnoverComponent, MoneyAgentTurnoverComponent, MoneyCheckoutTurnoverComponent, MoneyCashBalanceComponent,
    MoneyCustomerReturnsComponent, AccountReceivableTurnoverReportComponent, SuppliersAveragePaymentComponent, ProfitAnalysisComponent, 
    MoneyExpensesComponent, NetProfitComponent, TaskGridComponent, TaskCreateComponent, StockDynamicBalanceComponent, StockBalanceComponent, 
    StockUnmarketableComponent, PurchaseDeliveryDebtsTurnoverComponent, ArticlesTurnoverComponent, TaskInfoComponent, PartnerTaskGridComponent,
    PartnerTaskCreateComponent, PartnerTaskInfoComponent, PayReqGridComponent, PayReqInfoComponent
} from './views';
import {AppComponent} from './app.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

export const appRoutes: Routes = [
{
    data: {title: 'Главная'},
    path: 'main',
    component: MainComponent,
    //canActivate: [AuthGuardService]
},{
    path: 'money',
    data: { title: 'Деньги' },
    children: [
        { 
        path: 'moneyDynamicBalance',
        component: MoneyDynamicBalanceComponent,
        data: {title: 'Динамика остатка на р/c'} 
        },
        { 
        path: 'moneyBalance',
        component: MoneyBalanceComponent,
        data: {title: 'Остатки по компаниям'} 
        },
        { 
        path: 'moneyTurnover',
        component: MoneyTurnoverComponent,
        data: {title: 'Обороты по компаниям'} 
        },
        { 
        path: 'moneyAgentTurnover',
        component: MoneyAgentTurnoverComponent,
        data: {title: 'Обороты по контрагентам'} 
        },
        { 
        path: 'moneyCheckoutTurnover',
        component: MoneyCheckoutTurnoverComponent,
        data: {title: 'Обороты по кассе'} 
        },
        { 
        path: 'moneyCashBalance',
        component: MoneyCashBalanceComponent,
        data: {title: 'ДДС'} 
        },
        { 
        path: 'moneyCustomerReturns',
        component: MoneyCustomerReturnsComponent,
        data: {title: 'Возвраты покупателям'} 
        }
    ] 
}, {
    path: 'institute',
    data: { title: 'Дебиторы/Кредиторы' },
    children: [
        { 
        path: 'moneyAccountReceivablePayable',
        component: MoneyAccountReceivablePayableComponent,
        data: {title: 'Динамика дебиторской задолженности'} 
        },
        { 
        path: 'moneyAccountReceivable',
        component: MoneyAccountReceivableComponent,
        data: {title: 'Дебиторская задолженность'} 
        },
        { 
        path: 'moneyOutdatedAccountReceivable',
        component: MoneyOutdatedAccountReceivableComponent,
        data: {title: 'Дебиторская задолженность со сроками давности'} 
        },
        { 
        path: 'moneyAccountReceivableWithOverdure',
        component: MoneyAccountReceivableWithOverdureComponent,
        data: {title: 'Просроченная дебиторская задолженность'} 
        },
        { 
        path: 'accountReceivableTurnoverReport',
        component: AccountReceivableTurnoverReportComponent,
        data: {title: 'Средние сроки оплаты покупателей'} 
        },
        { 
        path: 'moneyAccountPayable',
        component: MoneyAccountPayableComponent,
        data: {title: 'Кредиторская задолженность'} 
        },
        { 
        path: 'moneyOutdatedAccountPayable',
        component: MoneyOutdatedAccountPayableComponent,
        data: {title: 'Кредиторская задолженность со сроками давности'} 
        },
        { 
        path: 'moneyAccountPayableWithOverdure',
        component: MoneyAccountPayableWithOverdureComponent,
        data: {title: 'Просроченная кредиторская задолженность'} 
        },
        { 
        path: 'suppliersAveragePayment',
        component: SuppliersAveragePaymentComponent,
        data: {title: 'Средние сроки оплаты поставщикам'} 
        }
    ] 
}, {
    path: 'profit',
    data: { title: 'Прибыль' },
    children: [
        { 
        path: 'profitTrends',
        component: ProfitTrendsComponent,
        data: {title: 'Понедельная валовая прибыль'} 
        }, 
        { 
        path: 'profitAnalysis',
        component: ProfitAnalysisComponent,
        data: {title: 'Продажи'} 
        }, 
        { 
        path: 'moneyExpenses',
        component: MoneyExpensesComponent,
        data: {title: 'Затраты'} 
        }, 
        { 
        path: 'netProfit',
        component: NetProfitComponent,
        data: {title: 'Чистая прибыль'} 
        }
    ] 
}, {
    path: 'articles',
    data: { title: 'Товары' },
    children: [
        { 
        path: 'stockDynamicBalance',
        component: StockDynamicBalanceComponent,
        data: {title: 'Динамика складских остатков'} 
        }, 
        { 
        path: 'stockBalance',
        component: StockBalanceComponent,
        data: {title: 'Остатки на складах'} 
        }, 
        { 
        path: 'stockUnmarketable',
        component: StockUnmarketableComponent,
        data: {title: 'Непродающиеся товары'} 
        }, 
        { 
        path: 'purchaseDeliveryDebtsTurnover',
        component: PurchaseDeliveryDebtsTurnoverComponent,
        data: {title: 'Средние сроки поставки товара от поставщиков'} 
        }, 
        { 
        path: 'articlesTurnover',
        component: ArticlesTurnoverComponent,
        data: {title: 'Средние сроки реализации складских запасов'} 
        }
    ] 
}, {
    path: 'documents',
    data: { title: 'Документы' },
    children: [
        { 
        path: 'taskGrid',
        component: TaskGridComponent,
        data: {title: 'Задачи'} 
        },
        { 
        path: 'partnerTaskGrid',
        component: PartnerTaskGridComponent,
        data: {title: 'Задачи партнёру'} 
        },
        { 
        path: 'payReqGrid',
        component: PayReqGridComponent,
        data: {title: 'Заявки на расход'} 
        }
    ]
}, { 
    path: 'moneyCashBalance',
    component: MoneyCashBalanceComponent
}, { 
    path: 'moneyAccountReceivableWithOverdure',
    component: MoneyAccountReceivableWithOverdureComponent
}, { 
    path: 'moneyAccountPayableWithOverdure',
    component: MoneyAccountPayableWithOverdureComponent
}, { 
    path: 'accountReceivableTurnoverReport',
    component: AccountReceivableTurnoverReportComponent
}, { 
    path: 'moneyCustomerReturns',
    component: MoneyCustomerReturnsComponent
}, { 
    path: 'purchaseDeliveryDebtsTurnover',
    component: PurchaseDeliveryDebtsTurnoverComponent
}, { 
    path: 'articlesTurnover',
    component: ArticlesTurnoverComponent
}, { 
    path: 'suppliersAveragePayment',
    component: SuppliersAveragePaymentComponent
}, { 
    path: 'profitAnalysis',
    component: ProfitAnalysisComponent
}, { 
    path: 'moneyExpenses',
    component: MoneyExpensesComponent
}, { 
    path: 'netProfit',
    component: NetProfitComponent
}, {
    path: 'taskGrid',
    component: TaskGridComponent,
}, {
    path: 'taskCreate',
    component: TaskCreateComponent,
}, {
    path: 'taskInfo/:id',
    component: TaskInfoComponent,
}, { 
    path: 'partnerTaskGrid',
    component: PartnerTaskGridComponent,
}, { 
    path: 'partnerTaskCreate',
    component: PartnerTaskCreateComponent,
}, {
    path: 'partnerTaskInfo/:id',
    component: PartnerTaskInfoComponent,
}, { 
    path: 'payReqGrid',
    component: PayReqGridComponent
},  {
    path: 'payReqInfo/:id',
    component: PayReqInfoComponent,
}, {
    path: 'signIn',
    component: SignInComponent,
}, {
    path: 'signOut',
    component: SignOutComponent,
}, {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuardService]
}];