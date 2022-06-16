import { Component, OnInit } from '@angular/core';
import {Quiz} from "../../../modal/Quiz";

@Component({
  selector: 'app-quizzes-file',
  templateUrl: './quizzes-file.component.html',
  styleUrls: ['./quizzes-file.component.css']
})
export class QuizzesFileComponent implements OnInit {
  newQuiz: Quiz[] = [
    // {name: "Quiz 1", birthday: "01-01-1990", locality: "Makeni", year: "2019", active: "Yes" },
    // {name: "Quiz 2", birthday: "01-01-1985", locality: "Makeni", year: "2020", active: "yes" },
    // {name: "Quiz 3", birthday: "01-01-1980", locality: "Freetown", year: "2020", active: "yes" },
  ];

  constructor() { }

  ngOnInit() {
  }

}
