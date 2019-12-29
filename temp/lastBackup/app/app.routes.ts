import { Routes } from '@angular/router';
import { MainComponent, SignInComponent, SignOutComponent, MoneyDynamicBalanceComponent/*, NavMenuComponent */} from './components';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

export const appRoutes: Routes = [/*{
    path: 'main',
    component: MainComponent,
    //data: {
    //    title: 'NavMenu.Home'
    //}
}, */{
    path: '',
    component: MainComponent,
    canActivate: [AuthGuardService],
    data: { title: 'Главная' }
    //redirectTo: 'main',
    //pathMatch: 'full'
}, {
    path: 'main',
    component: MainComponent,
    data: { title: 'Главная' }
}, {
    path: 'signIn',
    component: SignInComponent,
}, {
    path: 'signOut',
    component: SignOutComponent,
},/*{
    path: 'nav-menu',
    component: NavMenuComponent,
},*/{
    path: 'moneyDynamicBalance',
    component: MoneyDynamicBalanceComponent,
    //data: {
    //    title: 'NavMenu.Counter'
//}, 
}];