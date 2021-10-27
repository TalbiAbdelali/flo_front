import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SinginComponent } from './singin/singin.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, //{ path: 'users', component: UserListComponent },
  { path: 'signup', component: SinginComponent }, //{ path: 'adduser', component: UserFormComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }