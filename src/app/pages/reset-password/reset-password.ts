import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
selector:'app-reset-password',
standalone:true,
imports:[CommonModule,FormsModule],
templateUrl:'./reset-password.html',
styleUrls:['./reset-password.css']
})
export class ResetPasswordComponent{

email='';
newPassword='';
confirmPassword='';

constructor(private http:HttpClient){}

resetPassword(){

if(this.newPassword !== this.confirmPassword){

alert("Passwords do not match");
return;

}

const body={
email:this.email,
newPassword:this.newPassword
};

this.http.post('http://localhost:3000/auth/reset-password',body)
.subscribe({

next:()=>{

alert("Password reset successful");

this.email='';
this.newPassword='';
this.confirmPassword='';

},

error:(err)=>{

console.error(err);
alert("Reset password failed");

}

});

}

}