import { Injectable } from '@angular/core';
import { Message, WebsocketChatMessage, WebsocketJoinMessage, WebsocketMessage } from 'backend/backend';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { UserService } from './user.service';

export interface Channel{
  messages$: BehaviorSubject<Message[]>
  sendMessage: (body: string) => void;
  name: string;
}


@Injectable()
export class ChatService {
  public readonly channels: Channel[] = []
  public readonly channelCreated$ = new Subject<void>();

  private messages = new BehaviorSubject<Message[]>([]);
  private sharedWorker!: SharedWorker;

  constructor(
    private userService: UserService
  ) {
    this.sharedWorker = new SharedWorker('/assets/shared-worker.js');
    this.sharedWorker.port.onmessage = (message: MessageEvent<WebsocketMessage>) => {

      switch(message.data.type){
        case 'join-channel':
          console.log('join channel', message.data);
          const candidateChannel = this.channels.find(c => c.name === (message as MessageEvent<WebsocketJoinMessage>).data.channelName);
          if(!candidateChannel) this.createChannelInternally(message.data.channelName);
          break;
        case 'message': 
        console.log('message', message.data);
          const candiateChannel = this.channels
            .find(c => c.name === (message as MessageEvent<WebsocketChatMessage>).data.content.channel);
          if(candiateChannel) this.pushMessageToChannel(candiateChannel, message.data.content);
          break;

      }
    };

    this.sharedWorker.port.start();


    this.createChannel('main');
  }

  private pushMessageToChannel(channel: Channel, message: Message){
    const filteredMessages = channel.messages$
      .getValue().filter(m => !(m.body === message.body && m.creationTime === message.creationTime));
      
      filteredMessages.push(message);
      channel.messages$.next(filteredMessages);
  }

  private sendMessage(channel: string, body: string){
    this.userService.user$.pipe(
      take(1),
      filter(val => !!val?.name)
    ).subscribe(user => {
    const message: WebsocketChatMessage = {
      type: 'message',
      content: {
        body, 
        sender: user!.name,
        channel,
        origin: 'client',
        creationTime: new Date().toISOString(),
      }
    };
    const messages = this.messages.getValue();
    messages.push(message.content)
    this.messages.next(messages);

    this.sharedWorker.port.postMessage(message);

    
  });
  }
  private createChannelInternally(channelName: string){
    this.channels.push({
      name: channelName, 
      messages$: new BehaviorSubject<Message[]>([]),
      sendMessage: (body: string) => this.sendMessage(channelName, body),
    });
    this.channelCreated$.next();
  }
  createChannel(channelName: string){
    this.createChannelInternally(channelName);
    const joinMessage: WebsocketJoinMessage = {type: 'join-channel', channelName: channelName};
    this.sharedWorker.port.postMessage(joinMessage);
  }
}
