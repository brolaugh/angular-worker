import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Message } from 'backend/backend';
import { delay } from 'rxjs/operators';
import { Channel } from '../chat.service';
import { User } from '../user.service';

@Component({
  selector: 'app-chat-channel[channel][user]',
  templateUrl: './chat-channel.component.html',
  styleUrls: ['./chat-channel.component.css']
})
export class ChatChannelComponent {
  @Input()
  public channel!: Channel;
  @Input()
  public user!: User;

  public messageBox = new FormControl('', [Validators.required]);

  constructor(
    private changeDetector: ChangeDetectorRef,
  ){
  }

  ngOnInit(){
    this.channel.messages$.pipe(
      delay(0),
    ).subscribe(() => this.changeDetector.detectChanges());
  }

  submit(){
    if(this.messageBox.value === ''){
      return;
    }
    this.channel.sendMessage(this.messageBox.value);
    this.messageBox.setValue('');    
  }

  trackMessageById(_: number, message: Message): string {
    return message.creationTime + message.body;
  }

}
