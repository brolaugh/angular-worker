//shared-worker.worker.js
 
const connections = [];
let webSocket = undefined


function websocketConnect(){
  webSocket = new WebSocket("ws://localhost:3000");

  webSocket.onclose = () => {
    setTimeout(websocketConnect, 1000);
  };
  
  webSocket.onerror = () => {
    console.error('Socket encountered error: ', err.message, 'Closing socket');
    webSocket.close();
  
  };
}
websocketConnect();


self.onconnect = connectEvent => {
  const port = connectEvent.ports[0];

  port.start();
  connections.push(port);
  port.postMessage({
    body: 'You may write here v5',
    sender: 'System',
    creationTime: new Date().toISOString(),
  });
  const broadcastToTabs = message => {
    connections.forEach(connection => connection.postMessage(message));
  }

  port.onmessage = messageEvent => webSocket.send(JSON.stringify(messageEvent.data));
  webSocket.onmessage = messageEvent => broadcastToTabs(JSON.parse(messageEvent.data))
};



