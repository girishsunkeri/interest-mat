import { Injectable } from '@angular/core';
import { Event } from './event';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class EventService {
  eventsRef: AngularFireList<any>;
  eventRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  /* Create event */
  AddEvent(event: Event) {
    this.eventsRef.push({
      event_name: event.event_name,
      event_location: event.event_location,
      event_details: event.event_details,
      event_tags: event.event_tags,
      event_date: event.event_date
    })
    .catch(error => {
      this.errorMgmt(error);
    });
  }

  /* Get event */
  GetEvent(id: string) {
    this.eventRef = this.db.object('events-list/' + id);
    return this.eventRef;
  }

  /* Get event list */
  GetEventList() {
    this.eventsRef = this.db.list('events-list');
    return this.eventsRef;
  }

  /* Update event */
  UpdateEvent(id, event: Event) {
    this.eventRef.update({
      event_name: event.event_name,
      event_location: event.event_location,
      event_details: event.event_details,
      event_tags: event.event_tags,
      event_date: event.event_date
    })
    .catch(error => {
      this.errorMgmt(error);
    });
  }

  /* Delete event */
  DeleteEvent(id: string) {
    this.eventRef = this.db.object('events-list/' + id);
    this.eventRef.remove()
    .catch(error => {
      this.errorMgmt(error);
    });
  }

  // Error management
  private errorMgmt(error) {
    console.log(error);
  }
}
