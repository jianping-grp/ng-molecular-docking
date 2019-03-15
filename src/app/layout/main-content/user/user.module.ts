import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserRecordComponent } from './user-record/user-record.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {SharedModule} from '../../../shared/shared.module';
import {UserRoutingModule} from './user-routing.module';
import {ResultModule} from '../result/result.module';

@NgModule({
  declarations: [
    UserInfoComponent,
    UserRecordComponent,
    SignInComponent,
    SignUpComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ResultModule,
    UserRoutingModule
  ]
})
export class UserModule { }
