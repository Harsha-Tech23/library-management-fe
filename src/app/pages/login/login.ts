import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {

    this.http.post<any>('http://localhost:3000/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe(res => {

      const role = (res.role || '').toLowerCase();

      localStorage.setItem('role', role);
      localStorage.setItem('userId', res.id);

      this.router.navigate(['/dashboard']).then(() => {
        window.location.reload();
      });

    });

  }
}