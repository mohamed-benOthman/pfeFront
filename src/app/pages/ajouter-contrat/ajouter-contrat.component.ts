import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient, HttpEventType, HttpHeaders } from "@angular/common/http";
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from "ngx-file-drop";
import { MatStepper } from "@angular/material/stepper";
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";
import {
  AppDateAdapter,
  APP_DATE_FORMATS,
} from "src/app/shared/format-datepicker";
import { NgForm } from "@angular/forms";
import { ObjetAssure } from "src/app/models /objetAssure";
import * as moment from "moment";
import { VoitureService } from "src/app/services/voiture.service";
import { Contrat } from "src/app/models /contrat";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Headers } from "@angular/http";
import { ContratService } from "src/app/services/contrat.service";
@Component({
  selector: "app-ajouter-contrat",
  templateUrl: "./ajouter-contrat.component.html",
  styleUrls: ["./ajouter-contrat.component.css"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
  host: {
    "(window:resize)": "onWindowResize($event)",
  },
})
export class AjouterContratComponent implements OnInit {
  constructor(
    private contractService: ContratService,
    private http: HttpClient,
    private voitureService: VoitureService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  Marque = "marque";

  selectedFile: File = null;
  progress = 0;
  width: number = window.innerWidth;
  isVoiture = false;
  type: String = "";
  voiture = "voiture";
  optimalWidth = 1200;
  contrat = new Contrat();
  completed1 = false;
  completed2 = false;
  public files: NgxFileDropEntry[] = [];
  ngOnInit(): void {
    this.contrat.cfId = "";
  }
  onWindowResize(event) {
    this.width = event.target.innerWidth;
  }

  selectType(type: String) {
    this.type = type;
    console.log(this.type);
  }

  onSubmitObjet(form: NgForm, stepper: MatStepper) {
    const voiture = new ObjetAssure(
      moment(form.value.dateAquisition).format("DD-MM-YYYY"),
      moment(form.value.dateProduction).format("DD-MM-YYYY"),
      form.value.marque,
      form.value.puissance,
      form.value.chassis,
      form.value.serie,
      form.value.model
    );
    console.log(form.value.serie);
    console.log(voiture);
    console.log(voiture);
    this.voitureService.addVoiture(voiture).subscribe((res: any) => {
      console.log(res);
      this.contrat.objId = res;
      this.completed2 = true;
      console.log(this.completed2);
      stepper.next();
    });
  }
  onSubmitContractData(form: NgForm, stepper: MatStepper) {
    (this.contrat.dateEcheance = moment(form.value.dateEcheance).format(
      "DD-MM-YYYY"
    )),
      (this.contrat.numPolice = form.value.numPolice);
    this.contrat.remarque = form.value.remarques;
    this.contrat.dateEffective = moment(form.value.dateEffective).format(
      "DD-MM-YYYY"
    );

    this.contrat.adhId = this.data.adherent.id;
    this.completed1 = true;
    stepper.next();
  }
  onFileSelected(event, stepper) {
    this.selectedFile = <File>event.target.files[0];
    console.log(event.target);
    const fd = new FormData();
    fd.append("file", this.selectedFile);
    this.http
      .post("http://127.0.0.1:8000/apiPlatform/contracts", fd, {
        reportProgress: true,
        observe: "events",
        headers: new HttpHeaders({
          authorization: "bearer " + localStorage.getItem("token"),
        }),
      })
      .subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((event.loaded / event.total) * 100);
        }
        if (event.body != null) {
          this.contrat.cfId = event.body.id;
          console.log(this.contrat);
        }
      });
  }
  addContract(stepper) {
    console.log(this.contrat);
    this.contractService.addContract(this.contrat).subscribe((res) => {
      stepper.next(), console.log(res);
    });
  }
  public dropped(files: NgxFileDropEntry[], stepper) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          // You could upload it like this:
          const formData = new FormData();
          const token = "bearer " + localStorage.getItem("token");
          console.log(token);
          formData.append("file", file);

          this.http
            .post("http://127.0.0.1:8000/apiPlatform/contracts", formData, {
              reportProgress: true,
              observe: "events",
              headers: new HttpHeaders({
                authorization: "bearer " + localStorage.getItem("token"),
              }),
            })
            .subscribe((event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round((event.loaded / event.total) * 100);
              }
              if (event.body != null) {
                this.contrat.cfId = event.body.id;
                this.contractService
                  .addContract(this.contrat)
                  .subscribe((res) => stepper.next());
              }
            });
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}
