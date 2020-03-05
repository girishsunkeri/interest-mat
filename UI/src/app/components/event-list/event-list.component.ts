import { Component, OnInit, ViewChild } from '@angular/core';
import { Event } from './../../shared/event';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { EventService } from './../../shared/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent {
  dataSource: MatTableDataSource<Event>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  events: any = [];
  displayedColumns: any[] = [
    '$key',
    'event_name',
    'event_location',
    'event_details',
    'event_tags'
  ];

  constructor(private eventApi: EventService) {
    this.eventApi.GetEventList()
    .snapshotChanges().subscribe(events => {
        events.forEach(item => {
          let a = item.payload.toJSON();
          console.log(a);
          a['$key'] = item.key;
          this.events.push(a);
        });
        /* Data table */
        //this.dataSource = new MatTableDataSource(this.EventData);
        /* Pagination */
        // setTimeout(() => {
        //   this.dataSource.paginator = this.paginator;
        // }, 0);
    });
  }

  objectValues(obj) {
    return Object.values(obj);
 }

  /* Delete */
  deleteEvent(index: number, e) {
    if (window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.eventApi.DeleteEvent(e.$key);
    }
  }
}
