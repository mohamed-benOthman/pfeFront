import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {Routes, Router} from '@angular/router';
import {LoginComponent} from '../pages/login/login.component';
import { AdhrentsListComponent } from './adhrents-list/adhrents-list.component';
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AdhrentsListComponent,

  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,

  ]
})
export class ComponentsModule { }
