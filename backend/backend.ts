import * as express from 'express';
import * as expressWs from 'express-ws';

const appBase = express();
const {app, getWss} = expressWs(appBase);
const {clients} = getWss();

app.ws('/', (ws, req) => {
  console.log('Socket Connected');

  ws.on('message', data => {
    console.log('Got message', JSON.stringify(data.toString()), `sending to ${clients.size} clients`);
    setTimeout(() => clients.forEach(client => client.send(data)), 500);
  });

  ws.on('close', () => {
    console.log('WebSocket was closed');
})
});

app.listen(3000);