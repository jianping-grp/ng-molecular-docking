import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserInfoComponent} from './user-info/user-info.component';
import {UserRecordComponent} from './user-record/user-record.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {Docking1ResultComponent} from '../result/docking1-result/docking1-result.component';
import {Docking2ResultComponent} from '../result/docking2-result/docking2-result.component';
import {Screening1ResultComponent} from '../result/screening1-result/screening1-result.component';
import {Screening2ResultComponent} from '../result/screening2-result/screening2-result.component';
import {promise} from 'selenium-webdriver';
import fullyResolved = promise.fullyResolved;

const routes: Routes = [
  {
    path: 'user-info',
    component: UserInfoComponent
  },
  {
    path: 'user-record',
    component: UserRecordComponent,
    children: [
      {
        path: '',
        redirectTo: 'docking1-result',
        pathMatch: 'full'
      },
      {
        path: 'docking1-result',
        component: Docking1ResultComponent
      },
      {
        path: 'docking2-result',
        component: Docking2ResultComponent
      },
      {
        path: 'screening1-result',
        component: Screening1ResultComponent
      },
      {
        path: 'screening2-result',
        component: Screening2ResultComponent
      }
    ]
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
