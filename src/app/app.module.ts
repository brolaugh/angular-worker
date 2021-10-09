import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';


import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { RegistrationSheetComponent } from './registration-sheet/registration-sheet.component';
import { ChatService } from './chat.service';
import { UserService } from './user.service';
import { ChatChannelComponent } from './chat-channel/chat-channel.component';
import { CreateChannelDialogComponent } from './create-channel-dialog/create-channel-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationSheetComponent,
    ChatChannelComponent,
    CreateChannelDialogComponent
  ],
  providers:[
    ChatService,
    UserService,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatTabsModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
