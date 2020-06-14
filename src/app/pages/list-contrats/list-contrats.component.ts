import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "src/app/services/data.service";
import { Adherent } from "src/app/models /adherent";
import { AjouterContratComponent } from "../ajouter-contrat/ajouter-contrat.component";
import { MatDialog } from "@angular/material/dialog";
import { Contrat } from "src/app/models /contrat";
import { HttpClient } from "@angular/common/http";
import { ContratService } from "src/app/services/contrat.service";
import { Sort } from "@angular/material/sort";
import { PdfViewerComponent } from "src/app/components/pdf-viewer/pdf-viewer.component";
import * as moment from "moment";
import { card } from "src/app/models /card";

@Component({
  selector: "app-list-contrats",
  templateUrl: "./list-contrats.component.html",
  styleUrls: ["./list-contrats.component.css"],
  host: {
    "(window:resize)": "onWindowResize($event)",
  },
})
export class ListContratsComponent implements OnInit {
  constructor(
    private _Activatedroute: ActivatedRoute,
    private dataService: DataService,
    private dialog: MatDialog,
    private contractService: ContratService
  ) {}
  searchString: string;
  width: number = window.innerWidth;
  maxSize = 10;
  cin;
  optimalWidth = 1000;
  adherentType = "adherent";
  adherent: Adherent;
  adresse: String;
  listContrats: Contrat[];
  sortedData: Contrat[];
  public card1 = {
    name: "Nombre des Contrats",
    icon: "fas fa-file-signature",
  };

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
    this.contractService.getContrats().subscribe((res: any) => {
      this.listContrats = res;
      for (let item of this.listContrats) {
        console.log(item.dateEcheance);
      }
    });
  }
  openPdfViewerDialog(src) {
    console.log(src);
    const dialogRef = this.dialog.open(PdfViewerComponent, {
      data: { pdfSrc: src },
    });
  }
  convertDate(date) {
    return moment(date).format("DD-MM-YYYY");
  }
  openPdf(url) {
    window.open("http://127.0.0.1:8000/contracts/" + url);
  }
  sortData(sort: Sort) {
    const data = this.listContrats.slice();
    if (!sort.active || sort.direction === "") {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {
        case "nom":
          return compare(a.numPolice, b.numPolice, isAsc);
        case "prenom":
          return compare(a.dateEffective, b.dateEffective, isAsc);
        case "codeUtecom":
          return compare(a.dateEcheance, b.dateEcheance, isAsc);

        default:
          return 0;
      }
    });
  }
  totalContrats: Number;
  onWindowResize(event) {
    this.width = event.target.innerWidth;
  }
  changeMaxSize(number) {
    this.maxSize = number;
  }
  openAddDialog() {
    const dialogRef = this.dialog.open(AjouterContratComponent, {
      data: { adherent: this.adherent },
    });
  }
}
function compare(a: number | String, b: number | String, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
