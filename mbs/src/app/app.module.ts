import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./routing";
import { AppComponent } from "./app.component";
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
