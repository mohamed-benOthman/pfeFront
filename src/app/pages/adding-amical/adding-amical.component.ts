import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AmicalesService } from "src/app/services/amicales.service";
import { NgForm, FormControl } from "@angular/forms";
import { Amicale } from "../../models /amicale";
import { catchError, tap, map } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpInterceptor,
} from "@angular/common/http";
import { error } from "protractor";
import { DataService } from "src/app/services/data.service";
import { MatDialogRef } from "@angular/material/dialog";
import { LieuxService } from "src/app/services/lieux.service";
import { AdresseService } from "src/app/services/adresse.service";
import { Adresse } from "src/app/models /adresse";
import { AdherentsService } from "src/app/services/adherents.service";
import { throwError } from "rxjs";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-adding-amical",
  templateUrl: "./adding-amical.component.html",
  styleUrls: ["./adding-amical.component.css"],
  host: {
    "(window:resize)": "onWindowResize($event)",
  },
})
export class AddingAmicalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddingAmicalComponent>,
    public activeModal: NgbActiveModal,
    private amicaleService: AmicalesService,
    private dataService: DataService,
    private lieuxService: LieuxService,
    private adresseService: AdresseService,
    private router: Router,
    private location: Location
  ) {}
  amicale: Amicale;
  width: number = window.innerWidth;
  optimalWidth = 1200;
  gouvernorats;
  municipalites;
  municpalite;
  gouvernoratNumber = -1;
  success = false;
  exists = false;

  onWindowResize(event) {
    this.width = event.target.innerWidth;
  }
  selectGouvernorat(index: number) {
    this.gouvernoratNumber = index;
  }
  selectMunicipalite(municipalte: String) {
    this.municpalite = municipalte;
  }
  ngOnInit(): void {
    this.gouvernorats = this.lieuxService.getGouvernorats();
    this.municipalites = this.lieuxService.getMunicipalite();
  }
  onSubmit(form: NgForm) {
    let adresse;
    this.exists = false;
    if (this.dataService.searchAmicale(form.value.nom)) {
      this.exists = true;
    } else {
      if (form.value.municipalite != undefined) {
        adresse = new Adresse(
          form.value.rue,
          form.value.codePostale,
          this.municpalite,
          this.gouvernorats[this.gouvernoratNumber]
        );
      } else {
        adresse = new Adresse(form.value.rue, form.value.codePostale, "", "");
      }

      this.adresseService.addAdresse(adresse).subscribe((res) => {
        const amicale = new Amicale(
          form.value.nom,
          form.value.email,
          res,
          form.value.num1,
          form.value.num2
        );
        this.amicaleService
          .addAmicale(amicale)
          .pipe(
            catchError((err) => {
              console.log(err);
              return throwError("error from the server");
            })
          )
          .subscribe((res) => {
            this.dataService.addAmicale(amicale);

            this.router
              .navigateByUrl("", {
                skipLocationChange: true,
              })
              .then(() => {
                this.router.navigate([this.location.path()]);
                this.success = true;
              });
          });
      });
    }
  }
  close() {
    this.dialogRef.close();
  }
}
