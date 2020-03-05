export interface Event {
    $key: string;
   event_name: string;
   event_location: string;
   event_details: string;
   event_date: Date;
   event_tags: Array<string>;
}
