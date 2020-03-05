import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { EventService } from './../../shared/event.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Language {
  name: string;
}

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  tagsArray = [];
  @ViewChild('chipList', {static: false}) chipList;
  @ViewChild('resetEventForm', {static: false}) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  eventForm: FormGroup;
  BindingType: any = ['Paperback', 'Case binding', 'Perfect binding', 'Saddle stitch binding', 'Spiral binding'];

  ngOnInit() { 
    this.eventApi.GetEventList();
    this.submitEventForm();
  }

  constructor(
    public fb: FormBuilder,
    private eventApi: EventService
  ) { }

  /* Remove dynamic languages */
  remove(language: string): void {
    const index = this.tagsArray.indexOf(language);
    if (index >= 0) {
      this.tagsArray.splice(index, 1);
    }
  }

  /* Reactive event form */
  submitEventForm() {
    this.eventForm = this.fb.group({
      event_name: ['', [Validators.required]],
      event_details: ['', [Validators.required]],
      event_location: ['', [Validators.required]],
      event_date: ['', [Validators.required]],
      event_tags: [this.tagsArray]
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.eventForm.controls[controlName].hasError(errorName);
  }

  /* Add dynamic tags */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.tagsArray.length < 5) {
      this.tagsArray.push(value)
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  
  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.eventForm.get('event_date').setValue(convertDate, {
      onlyself: true
    })
  }

  /* Reset form */
  resetForm() {
    this.tagsArray = [];
    this.eventForm.reset();
    Object.keys(this.eventForm.controls).forEach(key => {
      this.eventForm.controls[key].setErrors(null)
    });
  }

  /* Submit event */
  submitEvent() {
    if (this.eventForm.valid){
      this.eventApi.AddEvent(this.eventForm.value)
      this.resetForm();
    }
  }

}