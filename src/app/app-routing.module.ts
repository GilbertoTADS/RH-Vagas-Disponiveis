import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { PersonalDataComponent } from './components/register-user/personal-data/personal-data.component';
import { AvailableVacanciesComponent } from './components/available-vacancies/available-vacancies.component';

const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path: '', redirectTo: '/login',pathMatch: 'full'},
  { path: 'register', component: RegisterUserComponent,pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'vacancies', component:AvailableVacanciesComponent, pathMatch: 'full'},
  { path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
