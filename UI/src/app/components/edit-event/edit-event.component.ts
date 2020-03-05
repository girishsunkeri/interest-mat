import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { EventService } from './../../shared/event.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Language {
  name: string;
}

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})

export class EditEventComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  languageArray: Language[] = [];
  @ViewChild('chipList', {static: false}) chipList;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  editEventForm: FormGroup;
  BindingType: any = ['Paperback', 'Case binding', 'Perfect binding', 'Saddle stitch binding', 'Spiral binding'];

  ngOnInit() {
    this.updateEventForm();
  }

  constructor(
    public fb: FormBuilder,    
    private location: Location,
    private eventApi: EventService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.eventApi.GetEvent(id).valueChanges().subscribe(data => {
      this.languageArray = data.languages;
      this.editEventForm.setValue(data);
    })
  }

  /* Update form */
  updateEventForm(){
    this.editEventForm = this.fb.group({
      event_name: ['', [Validators.required]],
      isbn_10: ['', [Validators.required]],
      author_name: ['', [Validators.required]],
      publication_date: ['', [Validators.required]],
      binding_type: ['', [Validators.required]],
      in_stock: ['Yes'],
      languages: ['']
    })
  }

  /* Add language */
  add(event: MatChipInputEvent): void {
    var input: any = event.input;
    var value: any = event.value;
    // Add language
    if ((value || '').trim() && this.languageArray.length < 5) {
      this.languageArray.push({name: value.trim()});
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Remove language */
  remove(language: any): void {
    const index = this.languageArray.indexOf(language);
    if (index >= 0) {
      this.languageArray.splice(index, 1);
    }
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.editEventForm.controls[controlName].hasError(errorName);
  }

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.editEventForm.get('publication_date').setValue(convertDate, {
      onlyself: true
    })
  }

  /* Go to previous page */
  goBack(){
    this.location.back();
  }

  /* Submit event */
  updateEvent() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if(window.confirm('Are you sure you wanna update?')){
        this.eventApi.UpdateEvent(id, this.editEventForm.value);
      this.router.navigate(['events-list']);
    }
  }

}