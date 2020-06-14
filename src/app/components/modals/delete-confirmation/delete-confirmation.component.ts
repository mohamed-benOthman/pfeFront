import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AmicalesService } from 'src/app/services/amicales.service';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AdherentsService } from 'src/app/services/adherents.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css'],
})
export class DeleteConfirmationComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private amicaleService: AmicalesService,
    private dataService: DataService,
    private adherentService: AdherentsService,
    private http: HttpClient,
    private router: Router
  ) {}
  isHidden = false;
  nom: String = this.data.nom;
  ngOnInit() {}
  async deleteAnything() {
    try {
      switch (this.data.type) {
        case 'amicale': {
          await this.amicaleService
            .deleteAmicale(this.nom)
            .subscribe((data) => console.log(data));
          this.dataService.deleteAmicale(this.nom);
        }
        case 'adherent': {
          const id: String = this.data.id;

          this.http
            .delete('http://127.0.0.1:8000/api/adherent/' + id)
            .subscribe((res) => {
              console.log(res);
              this.dataService.deleteAdherent(id);
            });
          // const date = new Date().getTime();
          // this.router.navigate(["/amicale", this.data.nomAmicale], {
          //   queryParams: { refresh: new Date().getTime() },
          // });
        }
      }

      this.dialogRef.close();
    } catch (err) {
      console.log(err);
    }
  }
  close() {
    this.dialogRef.close();
  }
}
