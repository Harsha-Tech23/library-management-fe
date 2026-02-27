import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { NavbarComponent } from '../../layout/navbar/navbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],  
  template: `
    <app-navbar></app-navbar>
    <h2>Library Dashboard</h2>

    <button routerLink="/books">Manage Books</button>
    <button (click)="logout()">Logout</button>
  `
})
export class DashboardComponent {

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
