//shared-worker.worker.js
 
const connections = [];
let webSocket = undefined

function getWelcomeMessage(){
  return {
    type: 'message',
    content: {
      body: 'Welcome to worker chat v6',
      sender: 'System',
      channel: 'main',
      creationTime: new Date().toISOString(),
    }
  }
}
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
  port.postMessage(getWelcomeMessage());

  const broadcastToTabs = message => {
    connections.forEach(connection => connection.postMessage(message));
  }
  port.onmessage = messageEvent => {
    console.log('From client', messageEvent.data);
    webSocket.send(JSON.stringify(messageEvent.data));
    broadcastToTabs(messageEvent.data);
  }
  webSocket.onmessage = messageEvent => {
    console.log('from ws', messageEvent.data);
    broadcastToTabs(JSON.parse(messageEvent.data));
  }
};



