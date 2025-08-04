import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './gaurds/auth.guard';
import { JobsComponent } from './jobs/jobs.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'login', component:LoginComponent},
    {path: 'signup', component:SignupComponent},
    {path: 'home', component: HomeComponent, canActivate: [authGuard]},
    {path: 'jobs', component: JobsComponent, canActivate: [authGuard]},
    {path: 'profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent), canActivate: [authGuard] }
];
    