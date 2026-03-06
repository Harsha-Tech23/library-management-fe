import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
selector:'app-dashboard',
standalone:true,
imports:[CommonModule],
template:`

<div style="display:flex;height:100vh">

<div style="width:200px;background:black;color:white;padding:20px">

<h3>LMS</h3>

<p><a href="/dashboard" style="color:white">Dashboard</a></p>
<p><a href="/books" style="color:white">Books</a></p>
<p><a href="/borrow" style="color:white">Borrowers</a></p>

<button (click)="logout()">Logout</button>

</div>

<div style="flex:1;padding:40px">

<h2>Library Dashboard</h2>

</div>

</div>

`
})
export class DashboardComponent{

constructor(private router:Router){}

logout(){

localStorage.clear()

this.router.navigate(['/'])

}

}