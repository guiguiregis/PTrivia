import { Component, OnInit } from '@angular/core';
import {Fiow} from "../../modal/Fiow";
import {FiowDataStorageService} from "../../fiow-data-storage.service";
import {FiowsFormComponent} from "../fiow/fiows-form/fiows-form.component";
import {MatDialog} from "@angular/material";
import { Observable } from 'rxjs';
import { FiowsEditFormComponent } from '../fiow/fiows-edit-form/fiows-edit-form.component';

@Component({
  selector: 'app-fiow-module',
  templateUrl: './fiow-module.component.html',
  styleUrls: ['./fiow-module.component.css']
})
export class FiowsModuleComponent implements OnInit {

  PoopFiows: Fiow[]=[];
  newFiow: Fiow[] = [
   
  ];
  id: number;
  closeResult: string;

  addModal : any;

  constructor(private myService: FiowDataStorageService,
              private  dialogRef: MatDialog) { }

  openDialog(){
    
    let dialog = this.dialogRef.open(FiowsFormComponent);

    dialog.afterClosed().subscribe(res => {
      // received data from dialog-component
      this.PoopFiows = this.myService.getAllFiow();
    })
  }

  
  openEditDialog(fiow){
    
    let dialog = this.dialogRef.open(FiowsEditFormComponent);
    dialog.componentInstance.fiow = fiow;
    
    dialog.afterClosed().subscribe(res => {
      // received data from dialog-component
      this.PoopFiows = this.myService.getAllFiow();
    })
  }

  ngOnInit(){



    this.myService._getFiows().then(data=>{
        
      let _data = data.data;

      _data.forEach(el => {
        
        el.questions = JSON.parse(el.questions);
        el.answers = JSON.parse(el.answers);
      });

      this.myService.PoopFiows = _data;
      this.PoopFiows = this.myService.PoopFiows;

      // console.log(this.PoopFiows);

    })
    .catch(err=>{
        console.log(err)
    })

    // console.log(this.myService.newFiow);
  }
 


  deleteFiow(index : number)
  {
    this.id = index;
    this.onDelete();
  }

  onDelete(){
    //@ts-ignore
    this.myService._deleteFiow(this.PoopFiows[this.id].id);
    this.myService.deleteFiow(this.id);
    // alert("Are You Sure")
    this.PoopFiows = this.myService.getAllFiow();
  }

  getFileId(url :string)
  {
    return url.split('/')[5];
  }
 


}
