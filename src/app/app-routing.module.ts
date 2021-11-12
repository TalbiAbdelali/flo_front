import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ProfilComponent } from './profil/profil.component';
import { AuthGuardService } from './service/auth-guard.service';
import { SinginComponent } from './singin/singin.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, //{ path: 'users', component: UserListComponent },
  { path: 'signup', component: SinginComponent }, //{ path: 'adduser', component: UserFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'menu', canActivate: [AuthGuardService], component: MenuComponent },
  { path: 'profil', canActivate: [AuthGuardService], component: ProfilComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }