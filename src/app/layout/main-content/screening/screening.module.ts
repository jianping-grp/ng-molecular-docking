import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreeningPlatformIntroductionComponent } from './screening-platform-introduction/screening-platform-introduction.component';
import { OnlineScreeningComponent } from './online-screening/online-screening.component';
import { ScreeningDocumentComponent } from './screening-document/screening-document.component';
import {ScreeningRoutingModule} from './screening-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import { ScreeningLibraryIntroductionComponent } from './screening-library-introduction/screening-library-introduction.component';
import { ScreeningHomeComponent } from './screening-home/screening-home.component';
import { OnlineScreening2Component } from './online-screening2/online-screening2.component';


@NgModule({
  declarations: [
    ScreeningPlatformIntroductionComponent,
    OnlineScreeningComponent,
    ScreeningDocumentComponent,
    ScreeningLibraryIntroductionComponent,
    ScreeningHomeComponent,
    OnlineScreening2Component
  ],
  imports: [
    CommonModule,
    SharedModule,
    ScreeningRoutingModule
  ]
})
export class ScreeningModule { }
