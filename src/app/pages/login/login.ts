import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {

    const body = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://localhost:3000/auth/login', body)
      .subscribe({

        next: (res) => {

          if (res.userId) {

            alert("Login Successful ✅");

            localStorage.setItem('userId', res.userId);
            localStorage.setItem('role', res.role);

            this.router.navigate(['/dashboard']);

          } else {

            alert(res.message || "Login Failed ❌");

          }

        },

        error: (err) => {

          console.log(err);
          alert("Server Error ❌");

        }

      });

  }

}
