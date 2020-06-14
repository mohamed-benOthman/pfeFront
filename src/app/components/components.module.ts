import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Routes, Router } from "@angular/router";
import { LoginComponent } from "../pages/login/login.component";
import { DeleteConfirmationComponent } from "./modals/delete-confirmation/delete-confirmation.component";
import { MaterialModule } from "../material/material.module";
import { FormsModule } from "@angular/forms";
import { SimpleInputComponent } from "./simple-input/simple-input.component";
import { SmallCardComponent } from "./small-card/small-card.component";
import { BigCardComponent } from "./big-card/big-card.component";
import { NgxPaginationModule } from "ngx-pagination";
import { FilterPipe } from "../pipes/filter.pipe";
import { SuccessComponent } from "./success/success.component";
import { PdfViewerComponent } from "./pdf-viewer/pdf-viewer.component";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { NotFound404Component } from "./not-found404/not-found404.component";
import { UsersTableComponent } from "./tables/users-table/users-table.component";
import { SigninComponent } from "./modals/signin/signin.component";
import { AmicalesCardComponent } from "./amicales-card/amicales-card.component";
import { FilterAmicalePipe } from "../pipes/filter-amicale.pipe";
import { ContractsTableComponent } from "./tables/contracts-table/contracts-table.component";
import { FilterContractPipe } from "../pipes/filter-contract.pipe";
import { DateEcheanceTableComponent } from "./tables/date-echeance-table/date-echeance-table.component";
import { ListAmicaleTableComponent } from './tables/list-amicale-table/list-amicale-table.component';

const appRoutes: Routes = [{ path: "login", component: LoginComponent }];
@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    RouterModule,
    NgbModule,
    MaterialModule,
    PdfViewerModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,

    DeleteConfirmationComponent,
    SimpleInputComponent,
    SmallCardComponent,
    BigCardComponent,

    SuccessComponent,
    PdfViewerComponent,
    LoadingSpinnerComponent,
    NotFound404Component,
    UsersTableComponent,
    SigninComponent,
    AmicalesCardComponent,
    FilterAmicalePipe,
    ContractsTableComponent,
    FilterContractPipe,

    DateEcheanceTableComponent,

    ListAmicaleTableComponent,
  ],
  exports: [
    FilterAmicalePipe,
    SimpleInputComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    SmallCardComponent,
    BigCardComponent,
    UsersTableComponent,
    SuccessComponent,
    PdfViewerComponent,
    LoadingSpinnerComponent,
    NotFound404Component,
    AmicalesCardComponent,
    ContractsTableComponent,
    DateEcheanceTableComponent,
  ],
})
export class ComponentsModule {}
