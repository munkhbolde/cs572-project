import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./routing";
import { AppComponent } from "./app.component";
<<<<<<< HEAD
import { QuestionComponent } from "./student/question/question.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AdminLogin } from "./admin/login";
import { AceEditorModule } from "ng2-ace-editor";

@NgModule({
  declarations: [AppComponent, QuestionComponent, AdminLogin],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AceEditorModule
  ],
=======
import { QuestionComponent } from './student/question/question.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import { AdminLogin } from './admin/login'
import { StaffCreate } from './admin/create-staff'
import { AceEditorModule } from "ng2-ace-editor";

@NgModule({
	declarations: [
		AppComponent,
		QuestionComponent,
		AdminLogin,
		StaffCreate
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
		AceEditorModule
	],
>>>>>>> 55ffd9a35fa2d2257224b496b670d68218cdbf02
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
