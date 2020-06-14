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
} from '@angular/core';
import { AdherentsService } from 'src/app/services/adherents.service';
import { Adherent } from 'src/app/models /adherent';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Sort } from '@angular/material/sort';
import { AmicalesService } from 'src/app/services/amicales.service';
import { DeleteConfirmationComponent } from 'src/app/components/modals/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatPaginator } from '@angular/material/paginator';
import { AddSomethingComponent } from '../add-something/add-something.component';
import { EditSomethingComponent } from '../edit-something/edit-something.component';

@Component({
  selector: 'app-all-adherents',
  templateUrl: './all-adherents.component.html',
  styleUrls: ['./all-adherents.component.css'],
  host: {
    '(window:resize)': 'onWindowResize($event)',
  },
})
export class AllAdherentsComponent implements OnInit {
  constructor(
    private adherentService: AdherentsService,
    private _Activatedroute: ActivatedRoute,
    private dataservice: DataService,
    private amicaleService: AmicalesService,
    private dialog: MatDialog
  ) {
    this.dataservice.currentAdherentList.subscribe((resopnse) => {
      if (resopnse.length != 0) { this.sortedData = resopnse; }
    });
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  nom: String;
  sortedData: Adherent[];
  totalAdherents: Number;
  width: number = window.innerWidth;
  height: number = window.innerHeight;
  optimalWidth = 916;
  listAdherent: Adherent[];
  searchString: string;

  num1: String;
  num2: String;
  nbAdherentsActifs;
  maxSize = 10;
  ngOnInit() {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.nom = params.get('nom');
    });

    this.adherentService.getAllAdhereants().subscribe((res) => {
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
        type: 'adherent',
        nom: nom,
        adrId: adresse,
        nomAmicale: this.nom,
      },
    });
  }
  openAddDialog() {
    const dialogRef = this.dialog.open(AddSomethingComponent, {});
  }
  openEditDialog(id) {
    const dialogRef = this.dialog.open(EditSomethingComponent, {
      data: { idAdherent: id },
    });
  }
  sortData(sort: Sort) {
    const data = this.listAdherent.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nom':
          return compare(a.nom, b.nom, isAsc);
        case 'prenom':
          return compare(a.prenom, b.prenom, isAsc);
        case 'codeUtecom':
          return compare(a.codeUtecom, b.codeUtecom, isAsc);
        case 'cin':
          return compare(a.cin, b.cin, isAsc);
        case 'numTel1':
          return compare(a.numTel1, b.numTel1, isAsc);
        case 'numTel2':
          return compare(a.numTel2, b.numTel2, isAsc);
        case 'numCarte':
          return compare(a.numCarte, b.numCarte, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        case 'statut':
          return compare(a.statut, b.statut, isAsc);
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
