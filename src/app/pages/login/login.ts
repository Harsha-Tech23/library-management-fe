import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';   

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {

    const credentials = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://localhost:3000/auth/login', credentials)
      .subscribe({
        next: (res) => {

          localStorage.setItem('token', res.access_token);
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {
          this.errorMessage = 'Invalid credentials';  
        }
      });
  }
}