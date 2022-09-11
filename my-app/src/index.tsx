import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./contaniers/home/Home";
import Game from "./contaniers/game/Game";
import { io } from "socket.io-client";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


interface Server {
  id: string,
  host: string,
  members: string[];
}


interface ServerToClientEvents {
  getServers: (res: Server[]) => void;
}

interface ClientToServerEvents {
  createServer: () => void;
  getServers: () => void;
}
const socket = io("http://localhost:8081");

if (socket != null) {
  console.log("creating socket");
  socket.emit("createServer");
} else {
  console.log("null socket");
}

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="game" element={<Game />}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
