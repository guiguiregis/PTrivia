import { Injectable, OnInit } from '@angular/core';
import {Fiow} from "./modal/Fiow";
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
export class FiowDataStorageService implements OnInit {
  FiowChanged = new Subject<Fiow[]>();
  newFiow: Fiow = new Fiow();
  editField: string;
  PoopFiows: Fiow[]=[

    // {name: "Kadijatu BAH", birthday: "01/01/1990", locality: "Makeni", year: "2019", active: "Yes" },
    // {name: "Hawa BAH", birthday: "01/01/1985", locality: "Makeni", year: "2020", active: "yes" },
    // {name: "Hussay BAH", birthday: "01/01/1980", locality: "Freetown", year: "2020", active: "yes" },
  ];

  constructor() { 

    // ApiServices._getfiows().then(data=>{
    //   console.log(data.data);
    // })
    // .catch(err=>{
    //   console.log(err);
    // })

    // this._getfiows().then(data=>{
        
    //   this.PoopFiows = data.data;
      
    // })
    // .catch(err=>{
    //     console.log(err)
    // })

  }

  ngOnInit() {
  
  }

  saveFiow(myNewFiow: Fiow){
    // this.PoopFiows.push(myNewFiow);
    this.PoopFiows.unshift(myNewFiow);
  }

  updateFiow(myUpdatedFiow: Fiow){

    //@ts-ignore
    var index = this.PoopFiows.findIndex(e=>e.id == myUpdatedFiow.id);
    this.PoopFiows[index] = myUpdatedFiow;
  }

   
  async _createFiow(data) {
    let _data = JSON.stringify(data);
    return await axios.post(baseUrl+'/fiows', _data, config);
  }

 
  async _updateFiow(id, data) {
    let _data = JSON.stringify(data);
    return await axios.patch(baseUrl+'/fiows/'+id, _data, config);
  }

   
  async _deleteFiow(id) {
    return await axios.delete(baseUrl+'/fiows/'+id, config);
  }


  async _getFiows() {
    return await axios.get(baseUrl+'/fiows', config);
  }
  
  getAllFiow(){
    
    return this.PoopFiows;
  }
  // editList(id: number, property: string, event: any) {
  //   const editField = event.target.textContent;
  //   this.filterResultDataSet[id][property] = editField;
  // }
  deleteFiow(index: number){
    this.PoopFiows.splice(index, 1)
    this.FiowChanged.next(this.PoopFiows.slice());
  }
}


