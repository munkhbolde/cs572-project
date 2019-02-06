import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

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
import { StaffList } from './admin/staff-list'

// Used for staff
import { StaffcompComponent } from './staffcomp/staffcomp.component';
import { StartExamComponent } from './student/start-exam/start-exam.component';


@NgModule({
	declarations: [
		AppComponent,
		QuestionComponent,
		AdminLogin,
		CreateStaff,
		CreateQuestion,
		QuestionList,
		StaffcompComponent,
		StaffList,
		StartExamComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
		AceEditorModule
	],
	providers: [{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }],
	bootstrap: [AppComponent]
})
export class AppModule { }
