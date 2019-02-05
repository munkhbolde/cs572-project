import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AdminLogin } from './admin/login'
import { CreateStaff } from './admin/create-staff'
import { CreateQuestion } from './admin/create-question'
import { QuestionList } from './admin/question-list'
import { QuestionComponent } from './student/question/question.component'
import { StaffcompComponent } from './staffcomp/staffcomp.component';

const routes: Routes = [
  { path: 'login', component: AdminLogin },
  { path: 'exam', component: QuestionComponent },
  { path: 'admin/create/staff', component: CreateStaff },
  { path: 'admin/create/question', component: CreateQuestion },
  { path: 'admin/questions', component: QuestionList },
  { path: 'staff', component: StaffcompComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
