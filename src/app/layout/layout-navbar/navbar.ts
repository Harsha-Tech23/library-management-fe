import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit {

  role = '';

  ngOnInit() {
    this.role = (localStorage.getItem('role') || '').toLowerCase();
  }

  logout(){

localStorage.clear()

window.location.href='/'

}

}