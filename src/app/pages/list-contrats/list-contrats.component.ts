import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "src/app/services/data.service";
import { Adherent } from "src/app/models /adherent";
import { AjouterContratComponent } from "../ajouter-contrat/ajouter-contrat.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-list-contrats",
  templateUrl: "./list-contrats.component.html",
  styleUrls: ["./list-contrats.component.css"],
})
export class ListContratsComponent implements OnInit {
  constructor(
    private _Activatedroute: ActivatedRoute,
    private dataService: DataService,
    private dialog: MatDialog
  ) {}
  cin;
  adherent: Adherent;
  adresse: String;
  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.cin = params.get("cin");
      this.adherent = this.dataService.searchAdherent2(this.cin);
      this.adresse =
        this.adherent.adresse.rue +
        " " +
        this.adherent.adresse.ville +
        " " +
        this.adherent.adresse.municipalite +
        " " +
        this.adherent.adresse.codePostale;
    });
  }
  openAddDialog() {
    const dialogRef = this.dialog.open(AjouterContratComponent);
  }
}
