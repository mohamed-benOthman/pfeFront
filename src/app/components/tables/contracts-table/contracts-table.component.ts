import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { PdfViewerComponent } from "../../pdf-viewer/pdf-viewer.component";
import { MatDialog } from "@angular/material/dialog";
import * as moment from "moment";
import { Sort } from "@angular/material/sort";
import { Contrat } from "src/app/models /contrat";

@Component({
  selector: "app-contracts-table",
  templateUrl: "./contracts-table.component.html",
  styleUrls: ["./contracts-table.component.css"],
  host: {
    "(window:resize)": "onWindowResize($event)",
  },
})
export class ContractsTableComponent implements OnInit {
  maxSize = 10;
  width: number = window.innerWidth;
  searchString: string;
  adherentType = "adherent";
  @Output() addClicked = new EventEmitter();
  @Input() listContrats: Contrat[];
  sortedData: Contrat[];
  optimalWidth = 1000;
  constructor(private dialog: MatDialog) {}
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
      this.listContrats = data;
      return;
    }

    this.listContrats = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {
        case "numPolice":
          return compare(a.numPolice, b.numPolice, isAsc);
        case "dateEcheance":
          return compare(a.dateEffective, b.dateEffective, isAsc);
        case "dateEffective":
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

  ngOnInit(): void {
    this.sortedData = this.listContrats;
  }
}
function compare(a: number | String, b: number | String, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
