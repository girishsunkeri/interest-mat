import { Injectable } from '@angular/core';
import { EnrollEvent } from './enroll-event';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class EnrollEventService {
  enrollEventsRef: AngularFireList<any>;
  enrollEventRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  EnrollEvent(enrollEvent: EnrollEvent) {
    this.enrollEventsRef.push({
      event_id: enrollEvent.event_id,
      user_id: enrollEvent.user_id,
      user_interests: enrollEvent.user_interests
    })
    .catch(error => {
      this.errorMgmt(error);
    });
  }

  GetEnrolledUsersOfEvent(eventId: string) {
    this.enrollEventsRef = this.db.list('/enroll-events', ref =>
        ref.orderByChild('event_id').equalTo(eventId)
            );
    return this.enrollEventsRef;
  }

  GetEnrolledEventsOfUser(userId: string) {
    this.enrollEventsRef = this.db.list('/enroll-events', ref =>
        ref.orderByChild('user_id').equalTo(userId)
    );
    return this.enrollEventsRef;
  }

  /* Get event list */
  GetEnrolledEvents() {
    this.enrollEventsRef = this.db.list('enroll-events');
    return this.enrollEventsRef;
  }

  // Error management
  private errorMgmt(error) {
    console.log(error);
  }
}
