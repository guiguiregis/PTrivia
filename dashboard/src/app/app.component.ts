import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { QuizzesFormComponent} from "./components/quizzes/quizzes-form/quizzes-form.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Poop-trivia dashboard';

  constructor(private  dialogRef: MatDialog) {
  }

  openDialog() {
    this.dialogRef.open(QuizzesFormComponent);
    
    // 
    // onNavigate(AppPractice: string) {
    //    this.Postgraudate = AppPractice;
    // }

  }
}
