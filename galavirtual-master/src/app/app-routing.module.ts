import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { PrincipalComponent } from './principal/principal.component';

// const routes: Routes = [
//   { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
//   { path: '', component: PrincipalComponent },
// ];
const routes: Routes = [
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'galaVirtual', component: PrincipalComponent },
  { path: '', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
