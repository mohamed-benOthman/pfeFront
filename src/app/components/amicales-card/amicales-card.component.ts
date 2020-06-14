import { Component, OnInit, Input, ViewChild, OnChanges } from "@angular/core";
import { Amicale } from "src/app/models /amicale";
import { EditAmicaleComponent } from "src/app/pages/edit-amicale/edit-amicale.component";
import { DeleteConfirmationComponent } from "../modals/delete-confirmation/delete-confirmation.component";
import { MatDialog } from "@angular/material/dialog";
import { AddingAmicalComponent } from "src/app/pages/adding-amical/adding-amical.component";
import { MatMenuTrigger } from "@angular/material/menu";
import { AmicalesService } from "src/app/services/amicales.service";

@Component({
  selector: "app-amicales-card",
  templateUrl: "./amicales-card.component.html",
  styleUrls: ["./amicales-card.component.css"],
  host: {
    "(window:resize)": "onWindowResize($event)",
  },
})
export class AmicalesCardComponent implements OnInit, OnChanges {
  @Input() listAmicales: Amicale[];
  width: number = window.innerWidth;
  @ViewChild("focusMenuTrigger") focusMenuTrigger: MatMenuTrigger;
  amicaleMap = new Map<Amicale, any>();
  constructor(
    public dialog: MatDialog,
    private amiclaeService: AmicalesService
  ) {}
  ngOnChanges() {
    for (let amicale of this.listAmicales)
      this.amiclaeService.getnbAdherents(amicale.nom).subscribe((res) => {
        this.amicaleMap.set(amicale, res);
      });
  }

  ngOnInit(): void {
    for (let amicale of this.listAmicales)
      this.amiclaeService.getnbAdherents(amicale.nom).subscribe((res) => {
        this.amicaleMap.set(amicale, res);
      });
  }
  onWindowResize(event) {
    this.width = event.target.innerWidth;
  }
  openDeleteDialog(nom: String, adresse: String) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: { nom: nom, adresse: adresse, type: "amicale" },
    });
  }

  openEditDialog(id) {
    const dialogRef = this.dialog.open(EditAmicaleComponent, {
      data: { nomAmicale: id },
    });
  }
  openMenu() {
    if (this.width < 1000) this.focusMenuTrigger.openMenu();
  }
  add() {
    const modalRef = this.dialog.open(AddingAmicalComponent);
  }
  public date = new Date();
}
