# 🗳️ Live Poll Battle

**Live Poll Battle** is a real-time multiplayer polling app where users can create or join rooms, vote between two options (e.g., "Cats vs Dogs"), and view live results with a 60-second timer. The app is fully real-time using WebSockets, includes a dark mode toggle, vote chart visualization, and a modern user experience.

---

## 🚀 Live Demo

- **Backend (WebSocket API)**: [Render Live URL](https://llumo-ai-live-poll-app.onrender.com)

---

## 🎯 Features

### ✅ Core Functionality
- Create or join a poll room using a unique room code.
- Vote between two options — e.g., 🐱 Cats vs 🐶 Dogs.
- Real-time vote count updates using WebSockets.
- One vote per user — enforced using `localStorage`.
- Countdown timer (60s) after which voting is disabled.
- Vote is remembered even on page refresh.


## ⚙️ Tech Stack

| Layer       | Stack                           |
|-------------|----------------------------------|
| Frontend    | ReactJS, Chart.js, CSS           |
| Backend     | Node.js, `ws` WebSocket library  |
| Realtime    | WebSockets (no database used)    |
| Deployment  | Render (Backend), Vercel (Frontend optional) |

---

## 📁 Project Structure
live-poll-battle/
├── client/             ✅ React frontend (rename react-client → client)
│   ├── src/
│   └── package.json
│   └── README.md (optional, can delete if you're using root README.md)
├── server/             ✅ NodeJS backend (rename server1 → server)
│   └── index.js
├── README.md           ✅ Main project README

## 💻 Local Setup

### 🖥️ Backend (WebSocket Server)

```bash
cd server1
npm install
node index.js
Server runs on ws://localhost:8080

Frontend (ReactJS)

cd react-client
npm install
npm start

🖥️ Frontend runs on http://localhost:3000

To build the frontend for production:
npm run build
