import { Component, OnInit } from '@angular/core';
import {Fiow} from "../../../modal/Fiow";
import {FiowDataStorageService} from "../../../fiow-data-storage.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { MatDialogRef } from '@angular/material';
import { Input } from '@angular/core';

@Component({
  selector: 'app-fiows-edit-form',
  templateUrl: './fiows-edit-form.component.html',
  styleUrls: ['./fiows-edit-form.component.css']
})

export class FiowsEditFormComponent implements OnInit {
  [x: string]: any;


  constructor(private myService: FiowDataStorageService, private dialogRef: MatDialogRef<FiowsEditFormComponent>) { }

  @Input() public fiow;

  validatingForm: FormGroup;
  
  newFiow : Fiow = new Fiow();

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


    console.log(this.fiow)


    this.question_en = this.fiow.questions.en;
    this.question_fr = this.fiow.questions.fr;
  
    this.answer1_en = this.fiow.answers.en[0].answer;
    this.answer2_en = this.fiow.answers.en[1].answer;
    this.answer3_en = this.fiow.answers.en[2].answer;
    this.answer4_en = this.fiow.answers.en[3].answer;
  
    this.answer1_fr = this.fiow.answers.fr[0].answer;
    this.answer2_fr = this.fiow.answers.fr[1].answer;
    this.answer3_fr = this.fiow.answers.fr[2].answer;
    this.answer4_fr = this.fiow.answers.fr[3].answer;
  
    this.level = this.fiow.level;


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

  updateFiow()
  {
 

    var questions = {en : this.question_en, fr : this.question_fr};
    this.fiow.questions = JSON.stringify(questions);
    var answers = {
      en : [{answer : this.answer1_en, isCorrect : true} , {answer : this.answer2_en, isCorrect : false} , {answer : this.answer3_en, isCorrect : false} , {answer : this.answer4_en, isCorrect : false}],
      fr : [{answer : this.answer1_fr, isCorrect : true} , {answer : this.answer2_fr, isCorrect : false} , {answer : this.answer3_fr, isCorrect : false} , {answer : this.answer4_fr, isCorrect : false}]
    }
    this.fiow.answers = JSON.stringify(answers);
    this.fiow.level = this.level;
    
    // Call the service to add the new student into the list
    this.myService._updateFiow(this.fiow.id, this.fiow).then(data=>{
        
      let _fiow = this.fiow;
      _fiow.questions = JSON.parse(_fiow.questions);
      _fiow.answers = JSON.parse(_fiow.answers);
      this.myService.updateFiow(_fiow);

      this.closeDialog();
   
    })
    .catch(err=>{
        console.log(err)
    })

    // console.log(this.birthday)

  }
}
 