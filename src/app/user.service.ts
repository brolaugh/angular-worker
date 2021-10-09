import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { RegistrationSheetComponent } from './registration-sheet/registration-sheet.component';

export interface User{
  name: string;
}

@Injectable()
export class UserService {

  private sessionStorage: Storage;
  private user = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.user.asObservable();

  constructor(
    private bottomSheet: MatBottomSheet,
  ){
    this.sessionStorage = window.sessionStorage;
    const candidateUser = this.sessionStorage.getItem('user');
    if(candidateUser){
      this.user.next(JSON.parse(candidateUser));
    }
    
    this.user$.subscribe(user => {
      if(!user) this.openBottomSheet()
      else this.sessionStorage.setItem('user', JSON.stringify(user));
    });
  }

  openBottomSheet(): void {
    const reference = this.bottomSheet.open(RegistrationSheetComponent);
    reference.afterDismissed().pipe(
      filter(val => !!val)
    ).subscribe(user => this.user.next(user));
  }

  setUser(user: User){
    this.user.next(user);
  }
}
