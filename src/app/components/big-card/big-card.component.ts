import { Component, OnInit, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddSomethingComponent } from "src/app/pages/add-something/add-something.component";

@Component({
  selector: "big-card",
  templateUrl: "./big-card.component.html",
  styleUrls: ["./big-card.component.css"],
})
export class BigCardComponent implements OnInit {
  @Input() name: string;
  @Input() type: string;
  @Input() email: string;
  @Input() num2: string;
  @Input() num1: string;
  @Input() typeId: string;
  @Input() adress: string;
  @Input() cin: string;
  constructor(private dialog: MatDialog) {}
  openEditDialog() {
    const dialogRef = this.dialog.open(AddSomethingComponent, {
      data: { idAmicale: this.typeId },
    });
  }
  ngOnInit(): void {}
}
