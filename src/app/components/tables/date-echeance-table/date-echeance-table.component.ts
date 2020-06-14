import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnChanges,
} from "@angular/core";
import { Contrat } from "src/app/models /contrat";
import * as moment from "moment";

@Component({
  selector: "app-date-echeance-table",
  templateUrl: "./date-echeance-table.component.html",
  styleUrls: ["./date-echeance-table.component.css"],
})
export class DateEcheanceTableComponent implements OnInit, OnChanges {
  @Output() addClicked = new EventEmitter();
  @Input() listContrats: any[];
  listToShow: any[];
  constructor() {}
  ngOnChanges() {
    this.listToShow = this.listContrats;
    for (let item of this.listToShow) {
      item.dateEcheance = moment(item.dateEcheance, "DD-MM-YYYY")
        .subtract(2, "months")
        .format("DD-MM-YYYY");
    }
    this.listToShow.sort((a, b) => {
      let dateA: any = this.process(a.dateEcheance),
        dateB: any = this.process(b.dateEcheance);
      return dateA - dateB;
    });
  }
  ngOnInit(): void {}
  process(date) {
    let parts = date.split("-");
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }
  makeResiliation() {}
}
