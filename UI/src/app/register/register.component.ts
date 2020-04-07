import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { EventService } from '../shared/event.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  error = '';

  constructor(
    public fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.currentError.subscribe(errorMessage => this.error = errorMessage);
    this.submitUserForm();
  }

  submitUserForm() {
    this.userForm = this.fb.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
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
      this.authService.signup(this.userForm.value.email, this.userForm.value.password);
    }
  }

}
