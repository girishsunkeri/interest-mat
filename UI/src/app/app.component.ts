import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  opened = true;
  email: string;
  password: string;
  error: string;

  constructor(public authService: AuthService) {}

  signup() {
    var response = this.authService.signup(this.email, this.password);
    this.error = this.authService.error;
    this.email = this.password = '';
  }

  login() {
    var response = this.authService.login(this.email, this.password);
    this.error = this.authService.error;
    this.email = this.password = '';
  }

  logout() {
    this.authService.logout();
  }

  redirectToLoginPage() {
    console.log("coming here to redirect to login page");
    this.authService.redirectToLoginPage();
  }

  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;

  ngOnInit() {
    if (window.innerWidth < 768) {
      //this.sidenav.fixedTopGap = 55;
      //this.opened = false;
    } else {
      //this.sidenav.fixedTopGap = 55;
      //this.opened = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }
}
