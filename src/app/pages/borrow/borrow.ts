import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
selector:'app-borrow',
standalone:true,
imports:[CommonModule],
templateUrl:'./borrow.html',
styleUrls:['./borrow.css']
})
export class BorrowComponent implements OnInit{

borrows:any[]=[]

constructor(private http:HttpClient){}

ngOnInit(){

this.loadBorrows()

}

loadBorrows(){

const userId=Number(localStorage.getItem('userId'))

this.http.get<any[]>('http://localhost:3000/borrow/'+userId)
.subscribe(data=>{

this.borrows=data

})

}

returnBook(id:number){

this.http.delete('http://localhost:3000/borrow/'+id)
.subscribe(()=>{

alert("Book Returned")

this.loadBorrows()

})

}

}