import { Component, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import { MatDialog, MatSnackBar } from '@angular/material';
import { EventDialogComponent } from './event-dialog/event-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}

  deleteDate = null;
  
  @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    { title: 'Event Now', start: new Date(), backgroundColor: "red", editable: true }
  ];

  deleteEventsOnDate() {
    let cont = 0;
    let deleteDate = this.deleteDate;
    let deleteEndDate = new Date(deleteDate.getTime());
    deleteEndDate.setDate(deleteEndDate.getDate() + 1);
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate(deleteDate);

    if(confirm("Are you sure you want to delete all the events on "+deleteDate)) {
      let events = calendarApi.getEvents();
        events.forEach(function(event){
          if (event.start >= deleteDate && event.start <= deleteEndDate) {
            cont++;
            event.remove();
          }
        });
    }

    if (cont) {
      this.snackBar.open(cont+" Evenets were deleted on "+deleteDate, "close", {
        duration: 2000,
      });
    }
  }

  eventClicked(event) {
    event = event.event;

    let reminder = {
      title: event.title,
      backgroundColor: event.backgroundColor,
      start: event.start,
      new: false
    };

    let dialogRef = this.dialog.open(EventDialogComponent, {data: reminder});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!result.delete) {
          event.setProp("title", result.title);
          event.setProp("backgroundColor", result.backgroundColor);
          event.setStart(result.start);
        }
        else {
          event.remove();
        }
      }
    });
  }

  handleDateClick(arg) {
    
    let reminder = {
      title: "New Reminder",
      backgroundColor: "blue",
      start: arg.date,
      new: true
    };

    let dialogRef = this.dialog.open(EventDialogComponent, {data: reminder});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let calendarApi = this.calendarComponent.getApi();
        calendarApi.addEvent(result);
      }
    });
  }

}