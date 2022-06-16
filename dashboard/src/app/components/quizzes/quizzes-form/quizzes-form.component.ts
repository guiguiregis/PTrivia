import { Component, OnInit } from '@angular/core';
import {Quiz} from "../../../modal/Quiz";
import {QuizDataStorageService} from "../../../quiz-data-storage.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-quizzes-form',
  templateUrl: './quizzes-form.component.html',
  styleUrls: ['./quizzes-form.component.css']
})

export class QuizzesFormComponent implements OnInit {


  constructor(private myService: QuizDataStorageService, private dialogRef: MatDialogRef<QuizzesFormComponent>) { }

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

  saveQuiz()
  {
    // console.log("New Quiz....")

    // Setup the new created quiz

    //Get active Status
    //@ts-ignore
    // const form = document.forms.form;
    // const radios = form.elements.customRadioInline1;
    // let isActive = radios.value;

    var questions = {en : this.question_en, fr : this.question_fr};
    this.newQuiz.questions = JSON.stringify(questions);
    var answers = {
      en : [{answer : this.answer1_en, isCorrect : true} , {answer : this.answer2_en, isCorrect : false} , {answer : this.answer3_en, isCorrect : false} , {answer : this.answer4_en, isCorrect : false}],
      fr : [{answer : this.answer1_fr, isCorrect : true} , {answer : this.answer2_fr, isCorrect : false} , {answer : this.answer3_fr, isCorrect : false} , {answer : this.answer4_fr, isCorrect : false}]
    }
    this.newQuiz.answers = JSON.stringify(answers);
    this.newQuiz.level = this.level;

    
     
    // this.newQuiz.id = new Date().getTime().toString();
    
    console.log(this.newQuiz)
    // Call the service to add the new student into the list
    this.myService._createQuiz(this.newQuiz).then(data=>{
        
      let _quiz = data.data;
      _quiz.questions = JSON.parse(_quiz.questions);
      _quiz.answers = JSON.parse(_quiz.answers);
      this.myService.saveQuiz(_quiz);

      this.closeDialog();
   
    })
    .catch(err=>{
        console.log(err)
    })

    // console.log(this.birthday)

  }
}
 