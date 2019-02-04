import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./routing";
import { AppComponent } from "./app.component";

import { QuestionComponent } from './student/question/question.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AdminLogin } from './admin/login'
import { CreateStaff } from './admin/create-staff'
import { CreateQuestion } from './admin/create-question'
import { AceEditorModule } from "ng2-ace-editor";
import { Interceptor } from './services/interceptor'

@NgModule({
	declarations: [
		AppComponent,
		QuestionComponent,
		AdminLogin,
		CreateStaff,
		CreateQuestion,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
		AceEditorModule
	],
	providers: [{provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {}
