import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { UserService } from './../../shared/user.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Language {
  name: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  interestArray = [];
  @ViewChild('chipList', {static: false}) chipList;
  @ViewChild('resetUserForm', {static: false}) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  userForm: FormGroup;
  BindingType: any = ['Paperback', 'Case binding', 'Perfect binding', 'Saddle stitch binding', 'Spiral binding'];

  ngOnInit() { 
    this.userApi.GetUserList();
    this.submitUserForm();
  }

  constructor(
    public fb: FormBuilder,
    private userApi: UserService
  ) { }

  /* Remove dynamic languages */
  remove(language: string): void {
    const index = this.interestArray.indexOf(language);
    if (index >= 0) {
      this.interestArray.splice(index, 1);
    }
  }

  /* Reactive user form */
  submitUserForm() {
    this.userForm = this.fb.group({
      user_first_name: ['', [Validators.required]],
      user_last_name: ['', [Validators.required]],
      user_email: ['', [Validators.required]],
      user_interests: [this.interestArray]
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  /* Add dynamic tags */
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
  
  /* Reset form */
  resetForm() {
    this.interestArray = [];
    this.userForm.reset();
    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.controls[key].setErrors(null)
    });
  }

  /* Submit user */
  submitUser() {
    if (this.userForm.valid){
      this.userApi.AddUser(this.userForm.value)
      this.resetForm();
    }
  }

}