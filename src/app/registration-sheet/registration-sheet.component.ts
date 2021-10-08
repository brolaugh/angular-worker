import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-registration-sheet',
  templateUrl: './registration-sheet.component.html',
  styleUrls: ['./registration-sheet.component.css']
})
export class RegistrationSheetComponent{
  nameControl = new FormControl('');

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<RegistrationSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) user: {name: string} | undefined,
  ) {
    this.nameControl.setValue(user?.name);
  }



  submit(){
    if(this.nameControl.value === ''){
      return;
    }
    this._bottomSheetRef.dismiss({
      name: this.nameControl.value,
    });
  }
}
