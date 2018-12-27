import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {PageModule} from './layout/main-content/page/page.module';
import {MAT_TOOLTIP_DEFAULT_OPTIONS} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgZorroAntdModule, NZ_I18N, NzMenuDirective, NzMenuModule, zh_CN} from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {UserComponent} from './layout/main-content/user/user/user.component';
import { Docking1ResultComponent } from './layout/main-content/result/docking1-result/docking1-result.component';
import { Docking2ResultComponent } from './layout/main-content/result/docking2-result/docking2-result.component';
import { Screening2ResultComponent } from './layout/main-content/result/screening2-result/screening2-result.component';
import { Screening1ResultComponent } from './layout/main-content/result/screening1-result/screening1-result.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    Docking1ResultComponent,
    Docking2ResultComponent,
    Screening2ResultComponent,
    Screening1ResultComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    PageModule,
    AppRoutingModule,
  ],
  providers: [
     {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: {}},
     { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
