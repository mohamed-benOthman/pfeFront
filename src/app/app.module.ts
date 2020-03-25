import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import {ComponentsModule} from './components/components.module';
import { AuthService } from './services/auth.service';
import {JwtInterceptorService} from '../app/services/jwt-interceptor.service';
import {DataService} from '../app/services/data.service';
import { AddingAmicalComponent } from './pages/adding-amical/adding-amical.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,




  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    AddingAmicalComponent,





  ],
  entryComponents: [
    AddingAmicalComponent
  ],
  providers: [AuthService, DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }, NgbActiveModal


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
