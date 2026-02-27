import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <a routerLink="/dashboard">Dashboard</a>
      <a routerLink="/books">Books</a>
      <a routerLink="/borrow">Borrow</a>
      <button (click)="logout()">Logout</button>
    </nav>
  `,
  styles: [`
    .navbar {
      background: #1e1e1e;
      padding: 12px;
      display: flex;
      gap: 20px;
      align-items: center;
    }
    a {
      color: white;
      text-decoration: none;
    }
    button {
      margin-left: auto;
      padding: 6px 12px;
      cursor: pointer;
    }
  `]
})
export class NavbarComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
