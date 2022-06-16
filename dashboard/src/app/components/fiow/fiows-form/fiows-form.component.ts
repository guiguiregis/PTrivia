import { Component, OnInit } from '@angular/core';
import {Fiow} from "../../../modal/Fiow";
import {FiowDataStorageService} from "../../../fiow-data-storage.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-fiows-form',
  templateUrl: './fiows-form.component.html',
  styleUrls: ['./fiows-form.component.css']
})

export class FiowsFormComponent implements OnInit {


  constructor(private myService: FiowDataStorageService, private dialogRef: MatDialogRef<FiowsFormComponent>) { }

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

  saveFiow()
  {
    // console.log("New Fiow....")

    // Setup the new created fiow

    //Get active Status
    //@ts-ignore
    // const form = document.forms.form;
    // const radios = form.elements.customRadioInline1;
    // let isActive = radios.value;

    var questions = {en : this.question_en, fr : this.question_fr};
    this.newFiow.questions = JSON.stringify(questions);
    var answers = {
      en : [{answer : this.answer1_en, isCorrect : true} , {answer : this.answer2_en, isCorrect : false} , {answer : this.answer3_en, isCorrect : false} , {answer : this.answer4_en, isCorrect : false}],
      fr : [{answer : this.answer1_fr, isCorrect : true} , {answer : this.answer2_fr, isCorrect : false} , {answer : this.answer3_fr, isCorrect : false} , {answer : this.answer4_fr, isCorrect : false}]
    }
    this.newFiow.answers = JSON.stringify(answers);
    this.newFiow.level = this.level;

    
     
    // this.newFiow.id = new Date().getTime().toString();
    
    console.log(this.newFiow)
    // Call the service to add the new student into the list
    this.myService._createFiow(this.newFiow).then(data=>{
        
      let _fiow = data.data;
      _fiow.questions = JSON.parse(_fiow.questions);
      _fiow.answers = JSON.parse(_fiow.answers);
      this.myService.saveFiow(_fiow);

      this.closeDialog();
   
    })
    .catch(err=>{
        console.log(err)
    })

    // console.log(this.birthday)

  }
}
 