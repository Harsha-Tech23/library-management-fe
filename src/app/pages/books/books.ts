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

  books:any[]=[]

  role=''
  userId=0

  newTitle=''
  newAuthor=''
  newIsbn=''
  newQuantity=0

  constructor(private http:HttpClient){}

  ngOnInit(){

    this.role=(localStorage.getItem('role')||'').toLowerCase()
    this.userId=Number(localStorage.getItem('userId'))

    this.loadBooks()

  }

  loadBooks(){

    this.http.get<any[]>('http://localhost:3000/books')
    .subscribe(data=>{

      this.books=data

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
    .subscribe({

      next:()=>{
        alert("Book Borrowed Successfully ✅")
        this.loadBooks()
      },

      error:(err)=>{
        console.log(err)
        alert("Borrow Failed ❌")
      }

    })

  }

  deleteBook(id:number){

    this.http.delete('http://localhost:3000/books/'+id)
    .subscribe({

      next:()=>{
        alert("Book Deleted Successfully ❌")
        this.loadBooks()
      },

      error:(err)=>{
        console.log(err)
        alert("Delete Failed")
      }

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
    .subscribe({

      next:()=>{
        alert("Book Added Successfully ✅")

        this.newTitle=''
        this.newAuthor=''
        this.newIsbn=''
        this.newQuantity=0

        this.loadBooks()
      },

      error:(err)=>{
        console.log(err)
        alert("Book Add Failed ❌")
      }

    })

  }

}