import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from './../../shared/event.service';
import { EnrollEventService } from './../../shared/enroll-event.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import { MatChipInputEvent } from '@angular/material';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/user.service";
import {User} from "../../shared/user";
import {EnrollEvent} from "../../shared/enroll-event";
import {Event} from "../../shared/event";

@Component({
  selector: 'app-enroll-event',
  templateUrl: './enroll-event.component.html',
  styleUrls: ['./enroll-event.component.css']
})
export class EnrollEventComponent {

  eventData: Event;
  eventId: string;
  loggedInUser: User;
  interestArray = [];
  selectable = true;
  removable = true;
  addOnBlur = true;
  enrollForm: FormGroup;
  isEnrolledEvent: boolean;
  @ViewChild('chipList', {static: false}) chipList;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  ngOnInit() {
    this.isEnrolledEvent = false;
    this.enrollEventApi.GetEnrolledEvents();
    this.enrollEventForm();
  }

  constructor(
      public fb: FormBuilder,
      private eventApi: EventService,
      private enrollEventApi: EnrollEventService,
      private location: Location,
      private actRoute: ActivatedRoute,
      private authService: AuthService,
      ) {

    this.eventId = this.actRoute.snapshot.paramMap.get('id');
    this.loggedInUser = this.authService.loggedInUser;

    /* Get event details*/
    this.eventApi.GetEvent(this.eventId).valueChanges().subscribe(data => {
      this.eventData = <Event> data;
    });

    this.enrollEventApi.GetEnrolledEvents();
    this.enrollEventApi.GetEnrolledEventsOfUser(this.loggedInUser.$key).snapshotChanges().subscribe(events => {
      events.forEach(event => {
        let a = <EnrollEvent> event.payload.toJSON();
        if(a.event_id == this.eventId) {
          this.isEnrolledEvent = true;
          this.interestArray = [];
          Object.values(a.user_interests).forEach(interest => {
            this.interestArray.push(interest)
          });
        }
      });
    });

    /* add user interests to array*/
    if(!this.isEnrolledEvent) {
      var interests = this.authService.loggedInUser.user_interests;
      if(interests) {
        this.interestArray = [];
        Object.values(interests).forEach(interest => {
          this.interestArray.push(interest)
        });
      }
    }
  }

  enrollEventForm() {
    this.enrollForm = this.fb.group({
      event_id: [this.actRoute.snapshot.paramMap.get('id')],
      user_id: [this.loggedInUser.$key],
      user_interests: [this.interestArray, [Validators.required]]
    })
  }

  objectValues(obj) {
    return Object.values(obj);
  }

  /* Go to previous page */
  goBack(){
    this.location.back();
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
    if ((value || '').trim() && this.interestArray.length < 5) {
      this.interestArray.push(value);
    }
    if (input) {
      input.value = '';
    }
  }

  enrollToEvent() {
    if(window.confirm('Are you sure you wanna enroll?')){
      this.enrollEventApi.EnrollEvent(this.enrollForm.value);
    }
  }
}
