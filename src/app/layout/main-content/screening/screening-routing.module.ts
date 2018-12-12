import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OnlineScreeningComponent} from './online-screening/online-screening.component';
import {ScreeningPlatformIntroductionComponent} from './screening-platform-introduction/screening-platform-introduction.component';
import {ScreeningDocumentComponent} from './screening-document/screening-document.component';
import {ScreeningLibraryIntroductionComponent} from './screening-library-introduction/screening-library-introduction.component';
import {ScreeningHomeComponent} from './screening-home/screening-home.component';

const routes: Routes = [
  {
    path: 'screening-home',
    component: ScreeningHomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'screening',
        pathMatch: 'full'
      },
      {
        path: 'screening',
        component: OnlineScreeningComponent
      },
      {
        path: 'screening-platform-introduction',
        component: ScreeningPlatformIntroductionComponent
      },
      {
        path: 'screening-document',
        component: ScreeningDocumentComponent
      },
      {
        path: 'screening-library-introduction',
        component: ScreeningLibraryIntroductionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreeningRoutingModule { }
