import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-channel-dialog',
  templateUrl: './create-channel-dialog.component.html',
  styleUrls: ['./create-channel-dialog.component.css']
})
export class CreateChannelDialogComponent{

  channelNameControl = new FormControl('', [Validators.required, Validators.minLength(4)]);

  constructor(private dialogRef: MatDialogRef<CreateChannelDialogComponent>) { 
  }

  submit(){
    if(this.channelNameControl.invalid){
      return;
    }
    this.dialogRef.close(this.channelNameControl.value);
  }
}
