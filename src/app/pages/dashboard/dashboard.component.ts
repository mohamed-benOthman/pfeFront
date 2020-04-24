import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";
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
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddingAmicalComponent } from "../adding-amical/adding-amical.component";
import { AmicalesService } from "src/app/services/amicales.service";
import { DataService } from "src/app/services/data.service";
import { MatDialog } from "@angular/material/dialog";
import { DeleteConfirmationComponent } from "src/app/components/modals/delete-confirmation/delete-confirmation.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  constructor(
    private modal: NgbModal,
    private amicaleService: AmicalesService,
    private dataService: DataService,
    public dialog: MatDialog,
    private router: Router
  ) {
    /* this.amicaleService.getAmicales()
    .subscribe(
      (res: Amicale[]) => {
        this.listAmicales = res;
      }
    );*/
    this.dataService.currentAmicaleList.subscribe(
      (resopnse) => (this.listAmicales = resopnse)
    );
  }
  name;
  space = "  ";
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked = true;
  public clicked1 = false;

  nb_adherant = 1500;
  nb_contrat = 2000;
  prime = 269.0;
  math = Math;
  // list = ['conv1', 'conv2', 'conv3', 'conv4', 'conv5', 'conv6','conv4', 'conv5', 'conv6', 'conv4', 'conv5', 'conv6',  'conv7', 'conv8', 'conv9', 'conv10'];
  listAmicales: Amicale[] = [];

  // you will have to get from the database ordered by the closest one to end(simple select with order by).
  // and push to an array and change it with this static array.
  tab1 = [
    {
      name: "foulen1",
      cin: "12345678",
      contrat: "contrat1",
      date: "12/12/2020",
    },
    {
      name: "foulen1",
      cin: "12345678",
      contrat: "contrat1",
      date: "12/12/2020",
    },
    {
      name: "foulen1",
      cin: "12345678",
      contrat: "contrat1",
      date: "12/12/2020",
    },
    {
      name: "foulen1",
      cin: "12345678",
      contrat: "contrat1",
      date: "12/12/2020",
    },
    {
      name: "foulen1",
      cin: "12345678",
      contrat: "contrat1",
      date: "12/12/2020",
    },
  ];

  tab2 = [
    { amical: "amical1", nb_visiteur: 51 },
    { amical: "amical1", nb_visiteur: 17 },
    { amical: "amical1", nb_visiteur: 100 },
    { amical: "amical1", nb_visiteur: 69 },
    { amical: "amical1", nb_visiteur: 97 },
  ];
  public date = new Date();
  openDeleteDialog(nom) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: { nom: nom, type: "amicale" },
    });
  }

  nextLine(i) {
    if (i % 4 == 0) {
      return true;
    } else {
      return false;
    }
  }

  public calculeTotal() {
    let total = 0;
    for (let i = 0; i < this.tab2.length; i++) {
      total += this.tab2[i].nb_visiteur;
    }
    return total;
  }
  add() {
    const modalRef = this.dialog.open(AddingAmicalComponent);
  }

  ngOnInit() {
    const chartOrders = document.getElementById("chart-orders");

    parseOptions(Chart, chartOptions());

    const ordersChart = new Chart(chartOrders, {
      type: "bar",
      options: chartExample2.options,
      data: chartExample2.data,
    });

    const chartSales = document.getElementById("chart-sales");

    this.salesChart = new Chart(chartSales, {
      type: "line",
      options: chartExample1.options,
      data: chartExample1.data,
    });
  }
  drop(event: CdkDragDrop<Amicale[]>) {
    moveItemInArray(this.listAmicales, event.previousIndex, event.currentIndex);
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
}
