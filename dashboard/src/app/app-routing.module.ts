import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuizzesFileComponent} from "./components/quizzes/quizzes-file/quizzes-file.component";
import {HomeComponent} from "./components/home/home.component";
import {QuizzesFilterComponent} from "./components/quizzes/quizzes-filter/quizzes-filter.component";
import {QuizzesFormComponent} from "./components/quizzes/quizzes-form/quizzes-form.component";
import {RouterModule, Routes } from '@angular/router';
import {QuizzesModuleComponent} from "./components/quiz-module/quiz-module.component";
import { FiowsFileComponent } from './components/fiow/fiows-file/fiows-file.component';
import { FiowsFilterComponent } from './components/fiow/fiows-filter/fiows-filter.component';
import { FiowsFormComponent } from './components/fiow/fiows-form/fiows-form.component';
import { FiowsModuleComponent } from './components/fiow-module/fiow-module.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'quizzes-file', component: QuizzesFileComponent },
  { path: 'quizzes-filter', component: QuizzesFilterComponent },
  { path: 'quizzes-form', component: QuizzesFormComponent },
  { path: 'quizzes', component: QuizzesModuleComponent },


  { path: 'fiows-file', component: FiowsFileComponent },
  { path: 'fiows-filter', component: FiowsFilterComponent },
  { path: 'fiows-form', component: FiowsFormComponent },
  { path: 'fiows', component: FiowsModuleComponent },


  { path: '**', redirectTo: '' }

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
