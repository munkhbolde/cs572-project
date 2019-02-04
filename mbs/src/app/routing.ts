import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLogin } from './admin/login'

const routes: Routes = [
	{path: 'login', component: AdminLogin},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
