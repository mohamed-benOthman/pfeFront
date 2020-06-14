import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "small-card",
  templateUrl: "./small-card.component.html",
  styleUrls: ["./small-card.component.css"],
  host: {
    "(window:resize)": "onWindowResize($event)",
  },
})
export class SmallCardComponent implements OnInit {
  @Input() name: string;
  @Input() statistics: string;
  @Input() icon: string;
  constructor() {}
  width: number = window.innerWidth;
  ngOnInit(): void {}
  onWindowResize(event) {
    this.width = event.target.innerWidth;
  }
}
