import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { User } from '../user.service';

@Component({
  selector: 'app-registration-sheet',
  templateUrl: './registration-sheet.component.html',
  styleUrls: ['./registration-sheet.component.css']
})
export class RegistrationSheetComponent{
  public nameControl = new FormControl('');

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<RegistrationSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) user: User | undefined,
  ) {
      _bottomSheetRef.disableClose = !user;
      this.nameControl.setValue(user?.name);
  }

  submit(){
    if(this.nameControl.value === ''){
      return;
    }
    this._bottomSheetRef.dismiss({name: this.nameControl.value});
  }
}
