import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { RegistrationSheetComponent } from './registration-sheet/registration-sheet.component';

export interface Message {
  body: string;
  sender: string;
  // id: string;
  creationTime: string; // iso date string
  origin: 'client' | 'server';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public messages: Message[] = [];
  public user: {name: string} | undefined = undefined;

  public messageBox = new FormControl('', [Validators.required]);
  private sharedWorker!: SharedWorker;
  private sessionStorage: Storage;

  constructor(
    private changeDetector: ChangeDetectorRef, 
    private bottomSheet: MatBottomSheet
  ){
    this.sessionStorage = window.sessionStorage;
  }

  ngOnInit(){
    this.sharedWorker = new SharedWorker('/assets/shared-worker.js');

    this.sharedWorker.port.onmessage = (message: MessageEvent<Message>) => {
      this.messages = this.messages.filter(m => !(m.body === message.data.body && m.creationTime === message.data.creationTime));
      this.messages.push({... message.data, origin: 'server'});
      this.changeDetector.detectChanges();
    };

    this.sharedWorker.port.start();

    const userCandidate = this.sessionStorage.getItem('user');
    if(userCandidate){
      this.user = JSON.parse(userCandidate);
    }else{
      this.openBottomSheet();
    }
  }

  openBottomSheet(): void {
    const a = this.bottomSheet.open(RegistrationSheetComponent, {
      disableClose: !!this.user,
      data: this.user
    });
    a.afterDismissed().subscribe(result => {
      if(!result){
        return;
      }
      this.user = result;
      this.sessionStorage.setItem('user', JSON.stringify(this.user));
    })
  }

  submit(){
    if(this.messageBox.value === '' || this.user === undefined){
      return;
    }

    const message: Message = {
      body: this.messageBox.value, 
      sender: this.user?.name,  
      origin: 'client',
      creationTime: new Date().toISOString(),
    };
    this.messageBox.setValue('');
    this.sharedWorker.port.postMessage(message);
    this.messages.push(message);
  }

  trackMessageById(_: number, message: Message): string {
    return message.creationTime + message.body;
  }
}
