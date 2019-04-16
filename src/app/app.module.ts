import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ColorPickerModule } from 'ngx-color-picker';

import { AppComponent } from './app.component';

import {
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventDialogComponent } from './event-dialog/event-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    EventDialogComponent
  ],
  entryComponents: [
    EventDialogComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    ColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
