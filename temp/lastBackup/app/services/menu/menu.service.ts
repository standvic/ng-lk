import { Injectable } from '@angular/core';

export class MenuItem {
    id?: string;
    text?: string;
    iconSrc?: string;
    disabled?: boolean;
    urlSrc?: string;
    selected?: boolean;
    items?: MenuItem[];
}

var mainMenu: MenuItem[] = [{
    id: "main",
    text: "Главная",
    urlSrc: "main",
    selected: false
    }, {
        id: "money",
        text: "Деньги",
        items: [
                {
                    text: 'Динамика остатка на р/c',
                    urlSrc: 'moneyDynamicBalance'
                }, {
                    text: 'Остатки по компаниям',
                    urlSrc: '#moneyBalance'
                }, {
                    text: 'Обороты по компаниям',
                    urlSrc: '#moneyTurnover'
                }, {
                    text: 'Обороты по контрагентам',
                    urlSrc: '#moneyAgentTurnover'
                }, {
                    text: 'Обороты по кассе',
                    urlSrc: '#moneyCheckoutTurnover'
                }, {
                    text: 'ДДС',
                    urlSrc: '#moneyCashBalance'
                }, {
                    text: 'Возвраты покупателям',
                    urlSrc: '#moneyCustomerReturns'
                }
            ],        
        selected: false
    }, {
        id: 'institute',
        text: 'Дебиторы/Кредиторы',
        items: [
            {
                text: 'Динамика задолженности',
                urlSrc: '#moneyAccountReceivablePayable'
            }, {
                text: 'Дебиторская задолженность',
                urlSrc: '#moneyAccountReceivable'
            }, {
                text: 'Дебиторская задолженность со сроками давности',
                urlSrc: '#moneyOutdatedAccountReceivable'
            }, {
                text: 'Просроченная дебиторская задолженность',
                urlSrc: '#moneyAccountsReceivableWithOverdue'
            }, {
                text: 'Средние сроки оплаты покупателей',
                urlSrc: '#accountReceivableTurnoverReport'
            },{
                text: 'Кредиторская задолженность',
                urlSrc: '#moneyAccountPayable'
            }, {
                text: 'Кредиторская задолженность со сроками давности',
                urlSrc: '#moneyOutdatedAccountPayable'
            }, {
                text: 'Просроченная кредиторская задолженность',
                urlSrc: '#moneyAccountsPayableWithOverdue'
            }, {
                text: 'Средние сроки оплаты поставщикам',
                urlSrc: '#suppliersAveragePayment'
            }
        ],
        selected: false
    }, {
        id: 'profit',
        text: 'Прибыль',
        items: [
            {
                text: 'Понедельная валовая прибыль',
                urlSrc: '#profitTrends'
            },
            {
                text: 'Продажи',
                urlSrc: '#profitAnalysis'
            },
            {
                text: 'Затраты',
                urlSrc: '#moneyExpenses'
            },            
            {
                text: 'Чистая прибыль',
                urlSrc: '#netProfit'
            }
        ],
        selected: false
    },{
        id: 'stock',
        text: 'Товары',
        items: [
            {
                text: 'Динамика складских остатков',
                urlSrc: '#stockDynamicBalance'
            }, {
                text: 'Остатки на складах',
                urlSrc: '#stockBalance'
            }, {
                text: 'Непродающиеся товары',
                urlSrc: '#stockUnmarketable'
            }, {
                text: 'Средние сроки поставки товара от поставщиков',
                urlSrc: '#purchaseDeliveryDebtsTurnover'
            }, {
                text: 'Средние сроки реализации складских запасов',
                urlSrc: '#articlesTurnover'
            }
        ],
        selected: false
    }, {
        id: 'documents',
        text: 'Документы',
        items: [
                {
                        text: 'Задачи',
                        urlSrc: '#taskGrid'
                },
                {
                        text: 'Задачи партнёру',
                        urlSrc: '#partnerTaskGrid'
                },
                {
                        text: 'Заявки на расход',
                        urlSrc: '#payReqGrid'
                }
        ],
        selected: false
    }, {
        id: 'exit',
        iconSrc: '../assets/images/exit.png',
        urlSrc: 'signOut',
        selected: false
    }
];

@Injectable()
export class MenuService {
    getMenuItems(): MenuItem[] {
        return mainMenu;
    }
}