import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Amicale } from "../../models /amicale";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../../variables/charts";
import { AddingAmicalComponent } from "../adding-amical/adding-amical.component";
import { AmicalesService } from "src/app/services/amicales.service";
import { DataService } from "src/app/services/data.service";
import { MatDialog } from "@angular/material/dialog";
import { DeleteConfirmationComponent } from "src/app/components/modals/delete-confirmation/delete-confirmation.component";
import { Router } from "@angular/router";
import { EditAmicaleComponent } from "../edit-amicale/edit-amicale.component";
import { AdherentsService } from "src/app/services/adherents.service";
import { ContratService } from "src/app/services/contrat.service";
import { Contrat } from "src/app/models /contrat";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  host: {
    "(window:resize)": "onWindowResize($event)",
  },
})
export class DashboardComponent implements OnInit {
  width: number = window.innerWidth;
  listContrats: Contrat[] = [];
  constructor(
    private contratService: ContratService,
    private adherentService: AdherentsService,

    private amicaleService: AmicalesService,
    private dataService: DataService,
    public dialog: MatDialog,
    private router: Router,
    private contractService: ContratService
  ) {
    this.contratService.getContrats().subscribe((res: any) => {
      this.listContrats = res;
    });
    this.adherentService
      .getnbAdherentsTotale()
      .subscribe((res) => (this.nbadherent = res));
    -this.dataService.currentAmicaleList.subscribe((resopnse) => {
      this.listAmicales = resopnse;
      console.log(this.listAmicales);
    });
    this.adherentService.getnbAdherentsActifs().subscribe((res) => {
      this.nbAdherentsActifs = res;
    });
    this.contratService
      .getNbContrats()
      .subscribe((res) => (this.nbContrats = res));
  }
  listAmicales: Amicale[] = [];

  public date = new Date();
  searchString: string;
  openDeleteDialog(nom: String, adresse: String) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: { nom: nom, adresse: adresse, type: "amicale" },
    });
  }
  onWindowResize(event) {
    this.width = event.target.innerWidth;
  }
  nbContrats;
  nbadherent;
  nbAdherentsActifs;
  openEditDialog(id) {
    const dialogRef = this.dialog.open(EditAmicaleComponent, {
      data: { nomAmicale: id },
    });
  }
  add() {
    const modalRef = this.dialog.open(AddingAmicalComponent);
  }

  ngOnInit() {}
}
