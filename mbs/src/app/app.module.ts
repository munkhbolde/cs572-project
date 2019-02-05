import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

<<<<<<< HEAD
import { AppRoutingModule } from "./routing";
import { AppComponent } from "./app.component";
import { QuestionComponent } from "./student/question/question.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AdminLogin } from "./admin/login";
import { StaffCreate } from "./admin/create-staff";
import { StaffcompComponent } from './staffcomp/staffcomp.component';
import { StaffserviceService } from './staffservice.service';
import { AceEditorModule } from "ng2-ace-editor";

@NgModule({
  declarations: [AppComponent, QuestionComponent, AdminLogin, StaffCreate, StaffcompComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AceEditorModule
  ],
  providers: [StaffserviceService],
=======
// General
import { AppRoutingModule } from './routing'
import { AppComponent } from './app.component'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { Interceptor } from './services/interceptor'

// Used for Exam
import { QuestionComponent } from './student/question/question.component'
import { AceEditorModule } from 'ng2-ace-editor'

// Used for admin
import { AdminLogin } from './admin/login'
import { CreateStaff } from './admin/create-staff'
import { CreateQuestion } from './admin/create-question'
import { QuestionList } from './admin/question-list'

@NgModule({
	declarations: [
		AppComponent,
		QuestionComponent,
		AdminLogin,
		CreateStaff,
		CreateQuestion,
		QuestionList,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
		AceEditorModule
	],
	providers: [{provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}],
>>>>>>> 38967a47b25a0dfca3205e1a9ff0fdc25aa3e997
  bootstrap: [AppComponent]
})
export class AppModule { }
