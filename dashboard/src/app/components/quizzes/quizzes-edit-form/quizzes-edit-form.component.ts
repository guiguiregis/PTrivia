import { Component, OnInit } from '@angular/core';
import {Quiz} from "../../../modal/Quiz";
import {QuizDataStorageService} from "../../../quiz-data-storage.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { MatDialogRef } from '@angular/material';
import { Input } from '@angular/core';

@Component({
  selector: 'app-quizzes-edit-form',
  templateUrl: './quizzes-edit-form.component.html',
  styleUrls: ['./quizzes-edit-form.component.css']
})

export class QuizzesEditFormComponent implements OnInit {
  [x: string]: any;


  constructor(private myService: QuizDataStorageService, private dialogRef: MatDialogRef<QuizzesEditFormComponent>) { }

  @Input() public quiz;

  validatingForm: FormGroup;
  
  newQuiz : Quiz = new Quiz();

  question_en : string = "";
  question_fr : string = "";

  answer1_en : string = "";
  answer2_en : string = "";
  answer3_en : string = "";
  answer4_en : string = "";

  answer1_fr : string = "";
  answer2_fr : string = "";
  answer3_fr : string = "";
  answer4_fr : string = "";

  level: number = 1;

  ngOnInit() {
    this.validatingForm = new FormGroup({
      formModalName: new FormControl('', Validators.required),
      signupFormModalEmail: new FormControl('', Validators.email),
      signupFormModalPassword: new FormControl('', Validators.required),
    });


    console.log(this.quiz)


    this.question_en = this.quiz.questions.en;
    this.question_fr = this.quiz.questions.fr;
  
    this.answer1_en = this.quiz.answers.en[0].answer;
    this.answer2_en = this.quiz.answers.en[1].answer;
    this.answer3_en = this.quiz.answers.en[2].answer;
    this.answer4_en = this.quiz.answers.en[3].answer;
  
    this.answer1_fr = this.quiz.answers.fr[0].answer;
    this.answer2_fr = this.quiz.answers.fr[1].answer;
    this.answer3_fr = this.quiz.answers.fr[2].answer;
    this.answer4_fr = this.quiz.answers.fr[3].answer;
  
    this.level = this.quiz.level;


  }

  get formModalName() {
    return this.validatingForm.get('name');
  }

  get signupFormModalEmail() {
    return this.validatingForm.get('signupFormModalEmail');
  }

  get signupFormModalPassword() {
    return this.validatingForm.get('signupFormModalPassword');
  }

  closeDialog(){
    this.dialogRef.close();
  }

  updateQuiz()
  {
 

    var questions = {en : this.question_en, fr : this.question_fr};
    this.quiz.questions = JSON.stringify(questions);
    var answers = {
      en : [{answer : this.answer1_en, isCorrect : true} , {answer : this.answer2_en, isCorrect : false} , {answer : this.answer3_en, isCorrect : false} , {answer : this.answer4_en, isCorrect : false}],
      fr : [{answer : this.answer1_fr, isCorrect : true} , {answer : this.answer2_fr, isCorrect : false} , {answer : this.answer3_fr, isCorrect : false} , {answer : this.answer4_fr, isCorrect : false}]
    }
    this.quiz.answers = JSON.stringify(answers);
    this.quiz.level = this.level;
    
    // Call the service to add the new student into the list
    this.myService._updateQuiz(this.quiz.id, this.quiz).then(data=>{
        

      let _quiz = this.quiz;
      console.log(data);
      _quiz.questions = JSON.parse(_quiz.questions);
      _quiz.answers = JSON.parse(_quiz.answers);
      this.myService.updateQuiz(_quiz);

      this.closeDialog();
   
    })
    .catch(err=>{
        console.log(err)
    })

    // console.log(this.birthday)

  }
}
 