import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { StaffcompComponent } from './staffcomp/staffcomp.component';
import { QuestionComponent } from './student/question/question.component'
import { AuthGuard } from './services/auth-guard'
import { StartExamComponent } from './student/start-exam/start-exam.component';

// Used for admin
import { AdminLogin } from './admin/login'
import { CreateStaff } from './admin/create-staff'
import { CreateQuestion } from './admin/create-question'
import { QuestionList } from './admin/question-list'
import { StaffList } from './admin/staff-list'
import { Report } from './admin/report'
import { Answer } from './admin/answer'
import { DoneComponent } from './student/done/done.component';

const routes: Routes = [
	{ path: 'exam', component: QuestionComponent },
	{ path: 'login', component: AdminLogin },
	{ path: 'admin', redirectTo: 'admin/questions' },
	{ path: 'admin/create/staff', component: CreateStaff, canActivate: [AuthGuard] },
	{ path: 'admin/create/question', component: CreateQuestion, canActivate: [AuthGuard] },
	{ path: 'admin/questions', component: QuestionList, canActivate: [AuthGuard] },
	{ path: 'admin/staffs', component: StaffList, canActivate: [AuthGuard] },
	{ path: 'admin/answer', component: Answer, canActivate: [AuthGuard] },
	{ path: 'admin/report', component: Report, canActivate: [AuthGuard] },
	{ path: 'staff', component: StaffcompComponent, canActivate: [AuthGuard] },
	{ path: 'start', component: StartExamComponent },
	{ path: 'done', component: DoneComponent },
	{ path: '**', redirectTo: 'login' },
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
