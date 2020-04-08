import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { EventService } from '../../shared/event.service';
import { AuthService } from '../../services/auth.service';
import { MatChipInputEvent } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  error = '';
  interestArray = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    public fb: FormBuilder,
    private authService: AuthService,
    private userApi: UserService
  ) { }

  ngOnInit() {
    this.authService.currentError.subscribe(errorMessage => this.error = errorMessage);
    this.authService.userCreated.subscribe(userCreated => {
      if (userCreated === true) {
        this.addAdditionalInfo();
      }
    });
    this.submitUserForm();
  }

  addAdditionalInfo() {
    if (this.userForm.valid){
      this.userApi.GetUserList();
      this.userApi.AddUser(this.userForm.value);
      this.authService.redirectToConferencePage();
    }
  }

  submitUserForm() {
    this.userForm = this.fb.group({
      user_first_name: ['', [Validators.required]],
      user_last_name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      user_email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      user_interests: [this.interestArray]
    });
  }

  resetForm() {
    this.userForm.reset();
    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.controls[key].setErrors(null)
    });
  }

  register() {
    console.log(this.userForm.value.email);
    if (this.userForm.valid) {
      this.authService.signup(this.userForm.value.user_email, this.userForm.value.password);
    }
  }

  remove(language: string): void {
    const index = this.interestArray.indexOf(language);
    if (index >= 0) {
      this.interestArray.splice(index, 1);
    }
  }

  add(user: MatChipInputEvent): void {
    const input = user.input;
    const value = user.value;
    // Add tag
    if ((value || '').trim() && this.interestArray.length < 5) {
      this.interestArray.push(value)
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Submit user */
  submitUser() {
    if (this.userForm.valid){
      this.userApi.AddUser(this.userForm.value)
      this.resetForm();
    }
  }

}
