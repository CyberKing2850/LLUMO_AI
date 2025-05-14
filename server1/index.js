const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

const wss = new WebSocket.Server({ port: 8080 });
const rooms = {};

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    const username = data.username;

    switch (data.type) {
      case 'CREATE_ROOM':
        const roomCode = uuidv4().slice(0, 6).toUpperCase();
        rooms[roomCode] = {
          users: {},
          votes: { Cats: 0, Dogs: 0 },
          voted: new Set(),
          timer: 60,
        };
        ws.send(JSON.stringify({ type: 'ROOM_CREATED', roomCode }));
        break;

      case 'JOIN_ROOM':
        const room = rooms[data.roomCode];
        if (room && !room.users[username]) {
          room.users[username] = ws;
          ws.roomCode = data.roomCode;
          ws.username = username;
          ws.send(JSON.stringify({ type: 'JOIN_SUCCESS', votes: room.votes }));
        } else {
          ws.send(JSON.stringify({ type: 'JOIN_FAIL' }));
        }
        break;

      case 'VOTE':
        const rc = ws.roomCode;
        const r = rooms[rc];
        if (r && !r.voted.has(ws.username) && r.timer > 0) {
          r.votes[data.option]++;
          r.voted.add(ws.username);
          broadcast(rc, { type: 'VOTE_UPDATE', votes: r.votes });
        }
        break;
    }
  });
});

function broadcast(roomCode, message) {
  const room = rooms[roomCode];
  if (!room) return;
  Object.values(room.users).forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

console.log("Server running at ws://localhost:8080");