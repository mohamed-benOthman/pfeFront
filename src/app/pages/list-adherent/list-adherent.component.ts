import {
  Component,
  OnInit,
  Directive,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  ViewChild,
} from "@angular/core";
import { AdherentsService } from "src/app/services/adherents.service";
import { Adherent } from "src/app/models /adherent";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { DataService } from "src/app/services/data.service";
import { Sort } from "@angular/material/sort";
import { AmicalesService } from "src/app/services/amicales.service";
import { DeleteConfirmationComponent } from "src/app/components/modals/delete-confirmation/delete-confirmation.component";
import { MatDialog } from "@angular/material/dialog";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { MatPaginator } from "@angular/material/paginator";
import { AddSomethingComponent } from "../add-something/add-something.component";
import { EditSomethingComponent } from "../edit-something/edit-something.component";

@Component({
  selector: "app-list-adherent",
  templateUrl: "./list-adherent.component.html",
  styleUrls: ["./list-adherent.component.css"],
  host: {
    "(window:resize)": "onWindowResize($event)",
  },
})
export class ListAdherentComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  nom: String;
  sortedData: Adherent[];
  totalAdherents: Number;
  width: number = window.innerWidth;
  height: number = window.innerHeight;
  optimalWidth = 916;
  constructor(
    private adherentService: AdherentsService,
    private _Activatedroute: ActivatedRoute,
    private dataservice: DataService,
    private amicaleService: AmicalesService,
    private dialog: MatDialog
  ) {
    this.dataservice.currentAdherentList.subscribe((resopnse) => {
      if (resopnse.length != 0) this.sortedData = resopnse;
    });
  }
  listAdherent: Adherent[];
  searchString: string;
  amicale;
  idAmicale: String;

  emailAmicale: String;
  adresseAmicale1: String; //pour la rue et la code postale
  adresseAmicale2: String;
  num1: String;
  num2: String;
  nbAdherentsActifs;
  ngOnInit() {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.nom = params.get("nom");
    });
    this.amicaleService.getCordonnes(this.nom).subscribe((res: any) => {
      this.idAmicale = res[0].id;
      this.emailAmicale = res[0].email;
      this.adresseAmicale1 = res[0].rue + " " + res[0].code_postale;
      this.adresseAmicale2 = res[0].ville + " " + res[0].municipalite;
      this.num1 = res[0].numero1;
      this.num2 = res[0].numero2;
    });

    this.adherentService.getAdherent(this.nom).subscribe((res) => {
      this.listAdherent = res;
      this.dataservice.addListAdherent(this.listAdherent);
      this.nbAdherentsActifs = this.dataservice.adherentsActifs();
      this.dataservice.currentAdherentList.subscribe(
        (resopnse) => (this.sortedData = resopnse)
      );
    });
  }
  openDeleteDialog(id, nom, adresse) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        id: id,
        type: "adherent",
        nom: nom,
        adrId: adresse,
        nomAmicale: this.nom,
      },
    });
  }
  openAddDialog() {
    const dialogRef = this.dialog.open(AddSomethingComponent, {
      data: { idAmicale: this.idAmicale },
    });
  }
  openEditDialog(id) {
    const dialogRef = this.dialog.open(EditSomethingComponent, {
      data: { idAdherent: id, idAmicale: this.idAmicale },
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
        case "prenom":
          return compare(a.prenom, b.prenom, isAsc);
        case "codeUtecom":
          return compare(a.codeUtecom, b.codeUtecom, isAsc);
        case "cin":
          return compare(a.cin, b.cin, isAsc);
        case "numTel1":
          return compare(a.numTel1, b.numTel1, isAsc);
        case "numTel2":
          return compare(a.numTel2, b.numTel2, isAsc);
        case "numCarte":
          return compare(a.numCarte, b.numCarte, isAsc);
        case "email":
          return compare(a.email, b.email, isAsc);
        case "statut":
          return compare(a.statut, b.statut, isAsc);
        default:
          return 0;
      }
    });
  }
  maxSize = 10;
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
