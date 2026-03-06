import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
selector:'app-borrow',
standalone:true,
imports:[CommonModule],
templateUrl:'./borrow.html'
})
export class BorrowComponent implements OnInit{

borrows:any[]=[];

constructor(private http:HttpClient){}

ngOnInit(){

this.loadBorrows();

}

loadBorrows(){

this.http.get<any>('http://localhost:3000/borrow')
.subscribe(res=>{

console.log("BORROW RESPONSE:",res);

if(Array.isArray(res)){
this.borrows=res;
}
else if(res.data){
this.borrows=res.data;
}

});

}

returnBook(id:number){

this.http.delete('http://localhost:3000/borrow/'+id)
.subscribe(()=>{

alert("Book Returned");

this.loadBorrows();

});

}

}