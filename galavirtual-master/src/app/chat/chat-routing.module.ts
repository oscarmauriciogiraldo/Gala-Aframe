import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

import { IndexComponent } from './index/index.component';

const routes: Routes = [
    { path: '', component: IndexComponent },
    // { path: 'chat', loadChildren: () => import('./chat.module').then(m => m.ChatModule), canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ChatRoutingModule { }
