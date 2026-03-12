import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
selector:'app-signup',
standalone:true,
imports:[CommonModule,FormsModule],
templateUrl:'./signup.html',
styleUrls:['./signup.css']
})
export class SignupComponent{

name='';
email='';
password='';
role='';

constructor(private http:HttpClient, private router:Router){}

signup(){

if(!this.name || !this.email || !this.password || !this.role){
alert("Please fill all fields");
return;
}

const body={
name:this.name,
email:this.email,
password:this.password,
role:this.role
};

this.http.post('http://localhost:3000/auth/signup',body)
.subscribe({

next:()=>{

alert("Signup successful");

this.router.navigate(['/login']);

},

error:(err)=>{

console.error(err);
alert("Signup failed");

}

});

}

}

