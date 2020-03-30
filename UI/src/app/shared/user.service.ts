import { Injectable } from '@angular/core';
import { User } from './user';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  usersRef: AngularFireList<any>;
  userRef: AngularFireObject<any>;
  loggedInUser: any =  {};

  constructor(private db: AngularFireDatabase) {}

  /* Create user */
  AddUser(user: User) {
    this.usersRef.push({
      user_first_name: user.user_first_name,
      user_last_name: user.user_last_name,
      user_email: user.user_email,
      user_interests: user.user_interests
    })
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  GetUserByEmail(email: string) {
    this.usersRef = this.db.list('/user-list', ref => ref.orderByChild('user_email').equalTo(email));
    return this.usersRef;
  }

  /* Get user */
  GetUser(id: string) {
    this.userRef = this.db.object('user-list/' + id);
    return this.userRef;
  }  

  /* Get user list */
  GetUserList() {
    this.usersRef = this.db.list('user-list');
    return this.usersRef;
  }

  /* Update user */
  UpdateUser(id, user: User) {
    this.userRef.update({
      user_first_name: user.user_first_name,
      user_last_name: user.user_first_name,
      user_email: user.user_first_name,
      user_interest: user.user_interests
    })
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  /* Delete user */
  DeleteUser(id: string) {
    this.userRef = this.db.object('user-list/' + id);
    this.userRef.remove()
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  // Error management
  private errorMgmt(error) {
    console.log(error)
  }
}