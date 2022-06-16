import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { QuizzesFilterComponent } from './components/quizzes/quizzes-filter/quizzes-filter.component';
import { QuizzesFormComponent } from './components/quizzes/quizzes-form/quizzes-form.component';
import { QuizzesFileComponent } from './components/quizzes/quizzes-file/quizzes-file.component';
import { RouterModule} from "@angular/router";
import { QuizzesModuleComponent } from './components/quiz-module/quiz-module.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { QuizzesEditFormComponent } from './components/quizzes/quizzes-edit-form/quizzes-edit-form.component';
import { FiowsFilterComponent } from './components/fiow/fiows-filter/fiows-filter.component';
import { FiowsFormComponent } from './components/fiow/fiows-form/fiows-form.component';
import { FiowsEditFormComponent } from './components/fiow/fiows-edit-form/fiows-edit-form.component';
import { FiowsFileComponent } from './components/fiow/fiows-file/fiows-file.component';
import { FiowsModuleComponent } from './components/fiow-module/fiow-module.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizzesFilterComponent,
    QuizzesFormComponent,
    QuizzesEditFormComponent,
    QuizzesFileComponent,
    QuizzesModuleComponent,

    FiowsFilterComponent,
    FiowsFormComponent,
    FiowsEditFormComponent,
    FiowsFileComponent,
    FiowsModuleComponent,

  ],
  entryComponents : [QuizzesEditFormComponent, FiowsEditFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
