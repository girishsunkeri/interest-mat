import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  private error = new BehaviorSubject('');
  currentError = this.error.asObservable();
  private userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;

    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log(this.userDetails);
        }
        else {
          this.userDetails = null;
        }
      }
    );
  }

  signup(email: string, password: string) {
    this._firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        this.changeMessage(err.message);
        console.log('Something went wrong:',err.message);
      });
  }

  login(email: string, password: string) {
    this._firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        this.redirectToConferencePage();
      })
      .catch(err => {
        this.changeMessage(err.message);
        console.log('Something went wrong:',err.message);
      });
  }

  changeMessage(message: string) {
    this.error.next(message);
  }

  // logout() {
  //   this._firebaseAuth
  //     .auth
  //     .signOut();
  // }


  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  isLoggedIn() {
    if (this.userDetails == null ) {
      return false;
    } else {
      return true;
    }
  }
  logout() {
    this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/login']));
  }

  redirectToConferencePage() {
    this.router.navigate(['/events-list']);
  }

  redirectToLoginPage() {
    this.router.navigate(['/login']);
  }
}
