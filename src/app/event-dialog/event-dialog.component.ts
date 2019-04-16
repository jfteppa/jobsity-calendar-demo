import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface ReminderData {
  title: string;
  backgroundColor: string;
  start: string;
  new: boolean;
  delete: boolean;
}

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public reminder: ReminderData) {}

    cancel(): void {
    this.dialogRef.close();
    }

    removeEvent(): void {
      this.reminder.delete = true;
      this.dialogRef.close(this.reminder);
    }
}
