import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.html'
})
export class ResetPasswordComponent {

  oldPassword='';
  newPassword='';
  confirmPassword='';

  userId:any;

  constructor(
    private http:HttpClient,
    private router:Router
  ){

    this.userId = localStorage.getItem('userId');

  }

  resetPassword(){

    const body={
      newPassword:this.newPassword
    }

    this.http.patch(
      'http://localhost:3000/users/reset-password/'+this.userId,
      body
    )
    .subscribe(()=>{

      alert("Password updated");

      this.router.navigate(['/login']);

    });

  }

}