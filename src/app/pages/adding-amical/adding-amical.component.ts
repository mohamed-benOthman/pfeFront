import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AmicalesService } from "src/app/services/amicales.service";
import { NgForm, FormControl } from "@angular/forms";
import { Amicale } from "../../models /amicale";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpInterceptor,
} from "@angular/common/http";
import { error } from "protractor";
import { DataService } from "src/app/services/data.service";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-adding-amical",
  templateUrl: "./adding-amical.component.html",
  styleUrls: ["./adding-amical.component.css"],
})
export class AddingAmicalComponent implements OnInit {
  error: String;
  amicale: Amicale;
  errorStatut = false;
  checkNom = false;
  checkNum = false;
  successStatut = false;
  unamePattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  constructor(
    public dialogRef: MatDialogRef<AddingAmicalComponent>,
    public activeModal: NgbActiveModal,
    private amicaleService: AmicalesService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.successStatut = false;

    this.checkNom = false;
    this.checkNum = false;
    this.errorStatut = false;
  }
  checkTelNumber(nombre: String) {
    const numbers = /^[0-9]+$/;
    if (nombre.match(numbers) && nombre.length === 8) {
      return true;
    } else {
      return false;
    }
  }
  onSubmit(form: NgForm) {
    this.errorStatut = false;
    this.checkForm(form.value.nom, form.value.num1, form.value.num2);
    let checkNumber1: Boolean = false;
    let checkNumber2: Boolean = false;
    if (form.value.num2 != "") {
      checkNumber2 = this.checkTelNumber(form.value.num2);
    } else {
      checkNumber2 = true;
    }
    checkNumber1 = this.checkTelNumber(form.value.num1);
    if (
      (this.checkNum == false || this.checkNom == false) &&
      checkNumber2 === true &&
      checkNumber1 === true
    ) {
      this.amicale = new Amicale(
        form.value.nom,
        form.value.adresse,
        form.value.email,
        form.value.num1,
        form.value.num2
      );

      this.amicaleService.addAmicale(this.amicale).subscribe(
        (resdata) => {
          this.successStatut = true;
          this.dataService.addAmicale(this.amicale);
          console.log(resdata);
        },
        (err) => {
          this.error = err;
        }
      );
    } else {
      this.error = "Les numéros du telphone sont erronnés";
    }
  }
  checkForm(nom: String, num1: String, num2) {
    if (nom == "") {
      this.checkNom = true;
    }
    if (num1 == "" && num2 == "") {
      this.checkNum = true;
    }
  }
  close() {
    this.dialogRef.close();
  }
}
