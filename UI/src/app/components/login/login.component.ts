import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { UserService } from './../../shared/user.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { EventService } from 'src/app/shared/event.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  users: any = [];
  @ViewChild('chipList', {static: false}) chipList;
  @ViewChild('resetUserForm', {static: false}) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  userForm: FormGroup;
  BindingType: any = ['Paperback', 'Case binding', 'Perfect binding', 'Saddle stitch binding', 'Spiral binding'];
  opened = true;
  email: string;
  password: string;
  error = '';

  ngOnInit() {
    this.authService.currentError.subscribe(errorMessage => this.error = errorMessage);
    this.submitUserForm();
  }

  constructor(
    public fb: FormBuilder,
    private userApi: UserService,
    private eventApi: EventService,
    private authService: AuthService
  ) { }

  /* Reactive user form */
  submitUserForm() {
    this.userForm = this.fb.group({
      user_email: ['', [Validators.required]],
      user_password: ['', [Validators.required]]
    })
  }

  /* Get errors */
  // public handleError = (controlName: string, errorName: string) => {
  //   return this.userForm.controls[controlName].hasError(errorName);
  // }

  /* Reset form */
  resetForm() {
    this.userForm.reset();
    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.controls[key].setErrors(null)
    });
  }

  /* Submit user */
  // submitUser() {
  //   if (this.userForm.valid){
  //     this.userApi.GetUserByEmail(this.userForm.value.user_email)
  //     .snapshotChanges().subscribe(events => {
  //         events.forEach(item => {
  //           let a = item.payload.toJSON();
  //           console.log(a);
  //           a['$key'] = item.key;
  //           this.userApi.loggedInUser = a;
  //           this.users.push(a);
  //         });
  //     });
  //     this.resetForm();
  //   }

  //   console.log(this.userApi.loggedInUser.$key);
  // }

  login() {
    if (this.userForm.valid) {
      this.authService.login(this.userForm.value.user_email, this.userForm.value.user_password);
    }
  }

}
