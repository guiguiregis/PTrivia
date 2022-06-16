import { Component, OnInit } from '@angular/core';
import {Quiz} from "../../modal/Quiz";
import {QuizDataStorageService} from "../../quiz-data-storage.service";
import {QuizzesFormComponent} from "../quizzes/quizzes-form/quizzes-form.component";
import {MatDialog} from "@angular/material";
import { Observable } from 'rxjs';
import { QuizzesEditFormComponent } from '../quizzes/quizzes-edit-form/quizzes-edit-form.component';

@Component({
  selector: 'app-quiz-module',
  templateUrl: './quiz-module.component.html',
  styleUrls: ['./quiz-module.component.css']
})
export class QuizzesModuleComponent implements OnInit {

  PoopQuizzes: Quiz[]=[];
  newQuiz: Quiz[] = [
   
  ];
  id: number;
  closeResult: string;

  addModal : any;

  constructor(private myService: QuizDataStorageService,
              private  dialogRef: MatDialog) { }

  openDialog(){
    
    let dialog = this.dialogRef.open(QuizzesFormComponent);

    dialog.afterClosed().subscribe(res => {
      // received data from dialog-component
      this.PoopQuizzes = this.myService.getAllQuiz();
    })
  }

  
  openEditDialog(quiz){
    
    let dialog = this.dialogRef.open(QuizzesEditFormComponent);
    dialog.componentInstance.quiz = quiz;
    
    dialog.afterClosed().subscribe(res => {
      // received data from dialog-component
      this.PoopQuizzes = this.myService.getAllQuiz();
    })
  }

  ngOnInit(){



    this.myService._getQuizzes().then(data=>{
        
      let _data = data.data;

      _data.forEach(el => {
        
        el.questions = JSON.parse(el.questions);
        el.answers = JSON.parse(el.answers);
      });

      this.myService.PoopQuizzes = _data;
      this.PoopQuizzes = this.myService.PoopQuizzes;

      // console.log(this.PoopQuizzes);

    })
    .catch(err=>{
        console.log(err)
    })

    // console.log(this.myService.newQuiz);
  }
 


  deleteQuiz(index : number)
  {
    this.id = index;
    this.onDelete();
  }

  onDelete(){
    //@ts-ignore
    this.myService._deleteQuiz(this.PoopQuizzes[this.id].id);
    this.myService.deleteQuiz(this.id);
    // alert("Are You Sure")
    this.PoopQuizzes = this.myService.getAllQuiz();
  }
 


}
