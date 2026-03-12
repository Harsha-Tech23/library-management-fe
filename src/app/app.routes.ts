import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { BooksComponent } from './pages/books/books';
import { BorrowComponent } from './pages/borrow/borrow';
import { LoginComponent } from './pages/login/login';
import { roleGuard } from './core/role.guard';
import { ResetPasswordComponent } from './pages/reset-password/reset-password';
import { SignupComponent } from './pages/signup/signup';

export const routes: Routes = [

  { path:'', component:LoginComponent },
  { path:'reset-password', component:ResetPasswordComponent },
  { path:'signup', component:SignupComponent },

  { path:'dashboard', component:DashboardComponent },

  { path:'books', component:BooksComponent },

  {
    path:'borrow',
    component:BorrowComponent,
    canActivate:[roleGuard]
  }

];