import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books.html',
  styleUrls: ['./books.css']
})
export class BooksComponent implements OnInit {

  books:any[]=[];
  role='';
  userId:any;

  newTitle='';
  newAuthor='';
  newIsbn='';
  newQuantity=0;

  constructor(private http:HttpClient){}

  ngOnInit(){

    this.role=(localStorage.getItem('role')||'').toLowerCase();
    this.userId=localStorage.getItem('userId');

    this.loadBooks();

  }

  loadBooks(){

    this.http.get<any[]>('http://localhost:3000/books')
    .subscribe(data=>{

      console.log("BOOK API RESPONSE:",data);

      this.books=data;

    })

  }

  addBook(){

    const body={
      title:this.newTitle,
      author:this.newAuthor,
      isbn:this.newIsbn,
      quantity:this.newQuantity
    }

    this.http.post('http://localhost:3000/books',body)
    .subscribe(()=>{

      alert("Book Added");

      this.loadBooks();

    })

  }

  deleteBook(id:number){

    this.http.delete('http://localhost:3000/books/'+id)
    .subscribe(()=>{

      alert("Book Deleted");

      this.loadBooks();

    })

  }

  borrowBook(book:any){

    const body={
      userId:this.userId,
      bookId:book.id,
      bookName:book.title,
      bookAuthor:book.author,
      isbn:book.isbn
    }

    this.http.post('http://localhost:3000/borrow',body)
    .subscribe(()=>{

      alert("Book Borrowed");

    })

  }

}