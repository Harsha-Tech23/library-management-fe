import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit {

  role = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.role = (localStorage.getItem('role') || '').toLowerCase();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}