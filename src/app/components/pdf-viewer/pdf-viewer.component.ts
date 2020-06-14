import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-pdf-viewer",
  templateUrl: "./pdf-viewer.component.html",
  styleUrls: ["./pdf-viewer.component.css"],
})
export class PdfViewerComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PdfViewerComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  pdfSrc: string = "http://127.0.0.1:8000/contracts/";
  ngOnInit(): void {
    this.pdfSrc = this.pdfSrc + this.data.pdfSrc;
  }
}
