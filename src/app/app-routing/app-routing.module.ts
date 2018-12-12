import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../layout/main-content/page/home/home.component';
import {HelpComponent} from '../layout/main-content/page/help/help.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'help',
    component: HelpComponent,
  },
  {
    path: 'docking',
    loadChildren: '../layout/main-content/docking/docking.module#DockingModule'
  },
  {
    path: 'screening',
    loadChildren: '../layout/main-content/screening/screening.module#ScreeningModule'
  },
  {
    path: 'user',
    loadChildren: '../layout/main-content/user/user.module#UserModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
