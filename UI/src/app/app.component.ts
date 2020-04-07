import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  opened = false;
  email: string;
  password: string;
  error: string;
  currentRoute: string;

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    var response = this.authService.signup(this.email, this.password);
    //this.error = this.authService.error;
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
    this.router.events.subscribe(polo => {
      console.log(polo);
      if (polo instanceof NavigationEnd ) {
        this.currentRoute = polo.url;
      }
    });
    console.log(this.router.url);
    this.authService.user.subscribe(val => {
      if (!val && this.currentRoute !== '/register') {
        this.redirectToLoginPage();
      }
    });
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
