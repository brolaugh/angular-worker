import * as express from 'express';
import * as expressWs from 'express-ws';
import { WebSocket } from 'ws';

const appBase = express();
const {app, getWss} = expressWs(appBase);
const {clients} = getWss();

export interface Message {
  body: string;
  sender: string;
  channel: string;
  // id: string;
  creationTime: string; // iso date string
  origin: 'client' | 'server';
}

export interface WebsocketJoinMessage{
  type: 'join-channel',
  channelName: string,
}

export interface WebsocketChatMessage{
  type: 'message',
  content: Message
}

export type WebsocketMessage = WebsocketChatMessage | WebsocketJoinMessage;

const blah: {client: WebSocket, channels: string[]}[] = [];


app.ws('/', (ws: WebSocket, req) => {
  console.log('Socket Connected');
  blah.push({client: ws, channels: ['main']});

  ws.on('message', data => {
    const networkMessage: WebsocketMessage = JSON.parse(data.toString());
    switch(networkMessage.type){
      case 'join-channel':
        blah.find(c => c.client === ws)?.channels.push(networkMessage.channelName);
        break;
      case 'message':
        console.log('Got message', networkMessage.content, `sending to ${clients.size} clients`);
        networkMessage.content.origin = 'server';
        const networkString = JSON.stringify(networkMessage);
        blah
        .filter(c => c.channels.includes(networkMessage.content.channel))
        .forEach(c => c.client.send(networkString));
        break;
    }
    
  });

  ws.on('close', () => {
    console.log('WebSocket was closed');
})
});

app.listen(3000);