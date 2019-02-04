import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminLogin } from "./admin/login";
import { StaffCreate } from "./admin/create-staff";
import { QuestionComponent } from "./student/question/question.component";

const routes: Routes = [
  { path: "login", component: AdminLogin },
  { path: "exam", component: QuestionComponent },
  { path: "admin/create/staff", component: StaffCreate }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
