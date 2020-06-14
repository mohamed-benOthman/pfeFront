import { Component, OnInit, Inject } from '@angular/core';
import { Amicale } from 'src/app/models /amicale';
import { AmicalesService } from 'src/app/services/amicales.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { Adresse } from 'src/app/models /adresse';
import { NgForm } from '@angular/forms';
import { AdresseService } from 'src/app/services/adresse.service';
import { AdherentsService } from 'src/app/services/adherents.service';
import { LieuxService } from 'src/app/services/lieux.service';

@Component({
  selector: 'app-edit-amicale',
  templateUrl: './edit-amicale.component.html',
  styleUrls: ['./edit-amicale.component.css'],
})
export class EditAmicaleComponent implements OnInit {
  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<EditAmicaleComponent>,
    private adresseService: AdresseService,
    private amicaleService: AmicalesService,
    private lieuxService: LieuxService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  nomAmicale: String;
  amicale: Amicale;
  adresse: Adresse;
  gouvernorats;
  municipalites;
  municpalite;
  gouvernoratNumber = -1;
  ngOnInit(): void {
    this.gouvernorats = this.lieuxService.getGouvernorats();
    this.municipalites = this.lieuxService.getMunicipalite();
    this.nomAmicale = this.data.nomAmicale;
    const amicaleAux = this.dataService.searchAmicale2(this.nomAmicale);
    this.amicale = new Amicale(
      this.nomAmicale,
      amicaleAux.email,
      amicaleAux.adrId,
      amicaleAux.numero1,
      amicaleAux.numero2
    );
    this.adresse = amicaleAux.adresse;
  }

  selectGouvernorat(index: number) {
    this.gouvernoratNumber = index;
    this.municpalite = '';
  }
  selectMunicipalite(municipalte: String) {
    this.municpalite = municipalte;
  }
  close() {
    this.dialogRef.close();
  }
  onSubmit(form: NgForm) {
    this.adresse.municipalite = this.gouvernorats[this.gouvernoratNumber];
    this.adresse.ville = this.municpalite;
    this.adresse.rue = form.value.rue;
    this.adresse.codePostale = form.value.codePostale;
    console.log(this.adresse);
    this.adresseService.addAdresse(this.adresse).subscribe((res: Number) => {
      console.log(res);
      this.amicale.adrId = res.toString();
      this.amicale.adresse = this.adresse;

      this.amicaleService
        .editAmicale(this.amicale)
        .subscribe((res) => this.dataService.editAmicale(this.amicale));
    });
  }
}
