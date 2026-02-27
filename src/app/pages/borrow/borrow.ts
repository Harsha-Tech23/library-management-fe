import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../layout/navbar/navbar';

@Component({
  selector: 'app-borrow',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './borrow.html'
})
export class BorrowComponent {

  borrowedBooks: any[] = [];

  constructor(private http: HttpClient) {
    this.loadBorrowedBooks();
  }

  loadBorrowedBooks(): void {
    this.http.get<any[]>('http://localhost:3000/borrow')
      .subscribe({
        next: (res) => {
          this.borrowedBooks = res;
        },
        error: (err) => {
          console.error('Borrow load error:', err);
        }
      });
  }

  returnBook(borrowId: number): void {
    this.http.patch('http://localhost:3000/borrow/return', { borrowId })
      .subscribe({
        next: () => {
          this.loadBorrowedBooks();
        },
        error: (err) => {
          console.error('Return error:', err);
        }
      });
  }
}
