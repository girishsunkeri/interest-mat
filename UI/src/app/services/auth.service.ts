import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './../shared/user.service';
import {User} from "../shared/user";

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  private error = new BehaviorSubject('');
  currentError = this.error.asObservable();
  private userCreatedSource = new BehaviorSubject(false);
  userCreated = this.userCreatedSource.asObservable();
  loggedInUser: User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router,
              private userApi: UserService) {

    this.user = _firebaseAuth.authState;

    this.user.subscribe(
      (user) => {
        if (user) {
          this.fetchUserdetails(user.email);
        }
        else {
          this.loggedInUser = null;
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
        this.userCreatedSource.next(true);
        //this.redirectToConferencePage();
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

  fetchUserdetails(email) {
    this.userApi.GetUserByEmail(email)
        .snapshotChanges().subscribe(users => {
            users.forEach(item => {
              let a = item.payload.toJSON();
              a['$key'] = item.key;
              this.loggedInUser = <User>a;
              // this.userDetails.id = item.key;
              // this.userDetails.first_name = a.user_first_name;
              // this.userDetails.last_name = a.user_last_name;
              // this.userDetails.interests = a.user_interests;
              console.log(a);
            });
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
    if (this.loggedInUser == null ) {
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
