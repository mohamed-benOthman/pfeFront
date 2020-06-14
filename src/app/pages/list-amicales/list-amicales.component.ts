import { Component, OnInit } from "@angular/core";
import { Amicale } from "src/app/models /amicale";
import { AdherentsService } from "src/app/services/adherents.service";
import { DataService } from "src/app/services/data.service";
import { AmicalesService } from "src/app/services/amicales.service";
import { MatDialog } from "@angular/material/dialog";
import { Sort } from "@angular/material/sort";

@Component({
  selector: "app-list-amicales",
  templateUrl: "./list-amicales.component.html",
  styleUrls: ["./list-amicales.component.css"],
})
export class ListAmicalesComponent implements OnInit {
  nom: String;
  sortedData: Amicale[];
  totalAdherents: Number;
  width: number = window.innerWidth;
  height: number = window.innerHeight;
  optimalWidth = 916;
  listAdherent: Amicale[];
  searchString: string;

  num1: String;
  num2: String;
  nbAdherentsActifs;
  maxSize = 10;
  constructor(
    private adherentService: AdherentsService,

    private dataservice: DataService,
    private amicaleService: AmicalesService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.amicaleService.getAmicales().subscribe((res) => {
      this.sortedData = res;
    });
  }

  sortData(sort: Sort) {
    const data = this.listAdherent.slice();
    if (!sort.active || sort.direction === "") {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {
        case "nom":
          return compare(a.nom, b.nom, isAsc);
        case "email":
          return compare(a.nom, b.nom, isAsc);
        default:
          return 0;
      }
    });
  }
  changeMaxSize(number) {
    this.maxSize = number;
  }
  onWindowResize(event) {
    this.width = event.target.innerWidth;
    this.height = event.target.innerHeight;
    console.log(this.width);
  }
}
function compare(a: number | String, b: number | String, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
