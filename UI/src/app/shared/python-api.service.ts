import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class PythonApiService {
  events: any = [];

  constructor(
    private userApi: UserService,
    private eventApi: EventService
  ) { }

  createJSONForAPI() {
    this.eventApi.GetEventList()
    .snapshotChanges().subscribe(events => {
        events.forEach(item => {
          let a = item.payload.toJSON();
          console.log(a);
          a['$key'] = item.key;
          this.events.push(a);

        });
    });
  }
}
