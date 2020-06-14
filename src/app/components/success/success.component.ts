import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "success",
  templateUrl: "./success.component.html",
  styleUrls: ["./success.component.css"],
})
export class SuccessComponent implements OnInit {
  constructor() {}
  @Input() label: string;

  ngOnInit(): void {
    if (this.label != null) this.label == "Ajouté avec succées";
  }
}
