import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-simple-input',
  templateUrl: './simple-input.component.html',
  styleUrls: ['./simple-input.component.css'],
})
export class SimpleInputComponent implements OnInit {
  @Input() name: String;
  @Input() placeholder: String;
  @Input() labelName: String;
  constructor() {}

  ngOnInit(): void {}
}
