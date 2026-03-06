import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { BooksComponent } from './pages/books/books';
import { BorrowComponent } from './pages/borrow/borrow';
import { LoginComponent } from './pages/login/login';
import { roleGuard } from './core/role.guard';

export const routes: Routes = [

  { path:'', component:LoginComponent },

  { path:'dashboard', component:DashboardComponent },

  { path:'books', component:BooksComponent },

  {
    path:'borrow',
    component:BorrowComponent,
    canActivate:[roleGuard]
  }

];