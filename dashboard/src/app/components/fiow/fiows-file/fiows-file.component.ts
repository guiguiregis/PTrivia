import { Component, OnInit } from '@angular/core';
import {Fiow} from "../../../modal/Fiow";

@Component({
  selector: 'app-fiows-file',
  templateUrl: './fiows-file.component.html',
  styleUrls: ['./fiows-file.component.css']
})
export class FiowsFileComponent implements OnInit {
  newFiow: Fiow[] = [
    // {name: "Fiow 1", birthday: "01-01-1990", locality: "Makeni", year: "2019", active: "Yes" },
    // {name: "Fiow 2", birthday: "01-01-1985", locality: "Makeni", year: "2020", active: "yes" },
    // {name: "Fiow 3", birthday: "01-01-1980", locality: "Freetown", year: "2020", active: "yes" },
  ];

  constructor() { }

  ngOnInit() {
  }

}
