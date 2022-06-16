import { Injectable, OnInit } from '@angular/core';
import {Quiz} from "./modal/Quiz";
import {Subject} from "rxjs";

import axios, { AxiosRequestConfig } from 'axios';

let config : AxiosRequestConfig = {
  headers: {
            "Access-Control-Allow-Origin" : "*",
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
  responseType: 'json'
};

// let baseUrl = 'http://localhost:3000';
let baseUrl = 'http://app-99fe77b7-b784-4ec7-ad64-a910b9bd4e05.cleverapps.io';


@Injectable({
  providedIn: 'root'
})
export class QuizDataStorageService implements OnInit {
  quizChanged = new Subject<Quiz[]>();
  newQuiz: Quiz = new Quiz();
  editField: string;
  PoopQuizzes: Quiz[]=[

    // {name: "Kadijatu BAH", birthday: "01/01/1990", locality: "Makeni", year: "2019", active: "Yes" },
    // {name: "Hawa BAH", birthday: "01/01/1985", locality: "Makeni", year: "2020", active: "yes" },
    // {name: "Hussay BAH", birthday: "01/01/1980", locality: "Freetown", year: "2020", active: "yes" },
  ];

  constructor() { 

    // ApiServices._getQuizzes().then(data=>{
    //   console.log(data.data);
    // })
    // .catch(err=>{
    //   console.log(err);
    // })

    // this._getQuizzes().then(data=>{
        
    //   this.PoopQuizzes = data.data;
      
    // })
    // .catch(err=>{
    //     console.log(err)
    // })

  }

  ngOnInit() {
  
  }

  saveQuiz(myNewQuiz: Quiz){
    // this.PoopQuizzes.push(myNewQuiz);
    this.PoopQuizzes.unshift(myNewQuiz);
  }

  updateQuiz(myUpdatedQuiz: Quiz){

    //@ts-ignore
    var index = this.PoopQuizzes.findIndex(e=>e.id == myUpdatedQuiz.id);
    this.PoopQuizzes[index] = myUpdatedQuiz;
  }

   
  async _createQuiz(data) {
    let _data = JSON.stringify(data);
    return await axios.post(baseUrl+'/quizzes', _data, config);
  }

 
  async _updateQuiz(id, data) {
    let _data = JSON.stringify(data);
    return await axios.patch(baseUrl+'/quizzes/'+id, _data, config);
  }

   
  async _deleteQuiz(id) {
    return await axios.delete(baseUrl+'/quizzes/'+id, config);
  }


  async _getQuizzes() {
    return await axios.get(baseUrl+'/quizzes', config);
  }
  
  getAllQuiz(){
    
    return this.PoopQuizzes;
  }
  // editList(id: number, property: string, event: any) {
  //   const editField = event.target.textContent;
  //   this.filterResultDataSet[id][property] = editField;
  // }
  deleteQuiz(index: number){
    this.PoopQuizzes.splice(index, 1)
    this.quizChanged.next(this.PoopQuizzes.slice());
  }
}


