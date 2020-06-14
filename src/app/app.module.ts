import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { MatDialogModule } from "@angular/material/dialog";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
// import { MatMenuModule } from "@angular/material/menu";
// import { MatTableModule } from "@angular/material/table";
import { MaterialModule } from "./material/material.module";
import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { AuthService } from "./services/auth.service";
import { JwtInterceptorService } from "../app/services/jwt-interceptor.service";
import { DataService } from "../app/services/data.service";
import { AddingAmicalComponent } from "./pages/adding-amical/adding-amical.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ListUsersComponent } from "./pages/list-users/list-users.component";
import { AdminGuard } from "./guards/admin.guard";
import { ListAdherentComponent } from "./pages/list-adherent/list-adherent.component";
// import { MatSortModule } from "@angular/material/sort";
import { NgxPaginationModule } from "ngx-pagination";
import { AgGridModule } from "ag-grid-angular";
import { FilterPipe } from "./pipes/filter.pipe";
import { ModifierAdherentComponent } from "./pages/modifier-adherent/modifier-adherent.component";
import { AllAdherentsComponent } from "./pages/all-adherents/all-adherents.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AddSomethingComponent } from "../app/pages/add-something/add-something.component";
import { EditSomethingComponent } from "./pages/edit-something/edit-something.component";
import { ListContratsComponent } from "./pages/list-contrats/list-contrats.component";
import { AjouterContratComponent } from "./pages/ajouter-contrat/ajouter-contrat.component";
import { DropzoneDirective } from "./pages/ajoyer-contrat/dropzone.directive";
import { NgxFileDropModule } from "ngx-file-drop";
import { EditAmicaleComponent } from "./pages/edit-amicale/edit-amicale.component";
import { EditUserComponent } from "./pages/edit-user/edit-user.component";
import { ListAmicalesComponent } from './pages/list-amicales/list-amicales.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    DragDropModule,
    MaterialModule,
    NgxPaginationModule,
    AgGridModule,
    ReactiveFormsModule,
    NgxFileDropModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    AddingAmicalComponent,
    ListUsersComponent,
    ListAdherentComponent,
    FilterPipe,
    ModifierAdherentComponent,
    AllAdherentsComponent,
    AddSomethingComponent,
    EditSomethingComponent,
    ListContratsComponent,
    AjouterContratComponent,
    DropzoneDirective,
    EditAmicaleComponent,
    EditUserComponent,
    ListAmicalesComponent,
  ],
  entryComponents: [AddingAmicalComponent],
  providers: [
    AdminGuard,
    AuthService,
    DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
    NgbActiveModal,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
