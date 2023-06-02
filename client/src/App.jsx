import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const ws = new WebSocket("ws://localhost:3000/cable")

function App() {
  const [messages, setMessages] = useState([]);
  const [guid, setGuid] = useState("");

  ws.onopen = () => {
    console.log("Connected to websocket server");
    setGuid(Math.random().toString(36).substring(2,15));
  }

  return (
    <div className="App">
      <div className="messageHeader">
        <h1>Messages</h1>
        <p>Guid: {guid}</p>
      </div>
    </div>
  )
}

export default App
