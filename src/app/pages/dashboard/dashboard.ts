import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
selector:'app-dashboard',
standalone:true,
imports:[CommonModule],
templateUrl:'./dashboard.html',
styleUrls:['./dashboard.css']
})
export class DashboardComponent implements OnInit{

role=''
activeTab='books'

books:any[]=[]
users:any[]=[]
borrows:any[]=[]
myBorrows:any[]=[]

constructor(private http:HttpClient){}

ngOnInit(){

this.role=(localStorage.getItem('role')||'').toLowerCase()

this.loadBooks()

if(this.role==='admin'){
this.loadUsers()
this.loadBorrows()
}

if(this.role==='user'){
this.loadMyBorrows()
}

}

setTab(tab:string){
this.activeTab=tab
}

loadBooks(){

this.http.get<any[]>('http://localhost:3000/books')
.subscribe(data=>{
this.books=data
})

}

loadUsers(){

this.http.get<any[]>('http://localhost:3000/users')
.subscribe(data=>{
this.users=data
})

}

loadBorrows(){

this.http.get<any[]>('http://localhost:3000/borrow')
.subscribe(data=>{
this.borrows=data
})

}

loadMyBorrows(){

const userId=localStorage.getItem('userId')

this.http.get<any[]>('http://localhost:3000/borrow/'+userId)
.subscribe(data=>{
this.myBorrows=data
})

}

}