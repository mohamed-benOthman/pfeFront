import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { ClipboardModule } from "ngx-clipboard";
import { MatMenuModule } from "@angular/material/menu";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { DeleteConfirmationComponent } from "src/app/components/modals/delete-confirmation/delete-confirmation.component";
import { MaterialModule } from "../../material/material.module";
import { ComponentsModule } from "src/app/components/components.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    DragDropModule,
    ComponentsModule,
    MaterialModule,
  ],
  entryComponents: [DeleteConfirmationComponent],
  declarations: [
    DashboardComponent,
    UserProfileComponent,

    IconsComponent,
    MapsComponent,
  ],
})
export class AdminLayoutModule {}
