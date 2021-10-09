import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Channel, ChatService } from './chat.service';
import { CreateChannelDialogComponent } from './create-channel-dialog/create-channel-dialog.component';
import { User, UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  public user$: Observable<User | undefined>;

  constructor(
    private matDialog: MatDialog,
    public chatService: ChatService,
    userService: UserService,
    changeDetector: ChangeDetectorRef,
  ){
      this.user$ = userService.user$;
      this.chatService.channelCreated$.pipe(
        delay(0)
      ).subscribe(() => changeDetector.detectChanges());
  }

  public createNewChannel(){
    const dialogReference = this.matDialog.open(CreateChannelDialogComponent);
    dialogReference.afterClosed().subscribe((channelName: string | undefined) => {
      if(channelName) this.chatService.createChannel(channelName);
    });
  }

  public trackByChannelName(_: number, channel: Channel){
    return channel.name;
  }
}
