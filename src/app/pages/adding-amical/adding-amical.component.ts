import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AmicalesService } from 'src/app/services/amicales.service';
import { NgForm, FormControl } from '@angular/forms';
import {Amicale} from '../../models /amicale';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { error } from 'protractor';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-adding-amical',
  templateUrl: './adding-amical.component.html',
  styleUrls: ['./adding-amical.component.css']
})
export class AddingAmicalComponent implements OnInit {
  amicale: Amicale;
  errorStatut = false;
  checkNom = false;
  checkNum = false;
  successStatut = false;
  unamePattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  constructor(public activeModal: NgbActiveModal, private amicaleService: AmicalesService, private dataService:DataService) {


  }

  ngOnInit(): void {
    this.successStatut = false;

    this.checkNom = false;
    this.checkNum = false;
    this.errorStatut = false;
  }
 onSubmit(form: NgForm) {

   this.errorStatut = false;
   this.checkForm(form.value.nom, form.value.num1, form.value.num2);
   if (this.checkNum == false || this.checkNom == false) {
  this.amicale = new Amicale(form.value.nom,
    form.value.adresse,
    form.value.email,
    form.value.num1,
    form.value.num2);

  this.amicaleService.addAmicale(this.amicale)
  .subscribe(
    resdata => {
      console.log(resdata);
      this.successStatut = true;
      this.dataService.addAmicale(this.amicale);
    },
    err => {
      this.errorStatut = true;

    }

  );
  }

}
checkForm(nom: String, num1: String, num2) {
  if (nom == '') {
      this.checkNom = true;
  }
  if (num1 == '' &&  num2 == '') {
    this.checkNum = true;
  }
}
}
