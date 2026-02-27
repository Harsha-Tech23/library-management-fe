import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../layout/navbar/navbar';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>

    <h2>Books List</h2>

    <table border="1" cellpadding="8" *ngIf="books.length > 0">
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Author</th>
        <th>ISBN</th>
        <th>Quantity</th>
        <th>Action</th>
      </tr>

      <tr *ngFor="let book of books">
        <td>{{ book.id }}</td>
        <td>{{ book.title }}</td>
        <td>{{ book.author }}</td>
        <td>{{ book.isbn }}</td>
        <td>{{ book.quantity }}</td>
        <td>
          <button (click)="borrowBook(book.id)">Borrow</button>
          <button (click)="deleteBook(book.id)">Delete</button>
        </td>
      </tr>
    </table>

    <p *ngIf="books.length === 0">No books available</p>

    <hr>

    <h3>Add Book</h3>

    <input [(ngModel)]="newTitle" placeholder="Title">
    <input [(ngModel)]="newAuthor" placeholder="Author">
    <input [(ngModel)]="newIsbn" placeholder="ISBN">
    <input [(ngModel)]="newQuantity" type="number" placeholder="Quantity">

    <button (click)="addBook()">Add Book</button>
  `
})
export class BooksComponent implements OnInit {

  books: any[] = [];

  newTitle = '';
  newAuthor = '';
  newIsbn = '';
  newQuantity: number = 0;

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.http.get<any[]>(`${this.apiUrl}/books`)
      .subscribe({
        next: (res) => this.books = res,
        error: (err) => console.error('Load books error:', err)
      });
  }

  addBook() {
    if (!this.newTitle || !this.newAuthor || !this.newIsbn || !this.newQuantity) {
      alert('All fields are required');
      return;
    }

    this.http.post(`${this.apiUrl}/books`, {
      title: this.newTitle,
      author: this.newAuthor,
      isbn: this.newIsbn,
      quantity: Number(this.newQuantity)
    }).subscribe({
      next: () => {
        alert('Book Added Successfully');
        this.newTitle = '';
        this.newAuthor = '';
        this.newIsbn = '';
        this.newQuantity = 0;
        this.loadBooks();
      },
      error: (err) => {
        console.error('Add book error:', err);
        alert('Failed to add book');
      }
    });
  }

  deleteBook(id: number) {
    this.http.delete(`${this.apiUrl}/books/${id}`)
      .subscribe({
        next: () => {
          alert('Book Deleted');
          this.loadBooks();
        },
        error: (err) => {
          console.error('Delete error:', err);
          alert('Delete failed');
        }
      });
  }

  borrowBook(bookId: number) {
    this.http.post(`${this.apiUrl}/borrow`, {
      bookId: bookId
    }).subscribe({
      next: () => {
        alert('Book Borrowed Successfully');
      },
      error: (err) => {
        console.error('Borrow failed:', err);
        alert('Borrow failed');
      }
    });
  }
}
