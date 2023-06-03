import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const ws = new WebSocket("ws://localhost:3000/cable")

function App() {
  const [messages, setMessages] = useState([]);
  const [guid, setGuid] = useState("");
  const messagesContainer = document.createElement("messages");

  ws.onopen = () => {
    console.log("Connected to websocket server");
    setGuid(Math.random().toString(36).substring(2,15));

    ws.send(
      JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          id: guid,
          channel: "MessagesChannel"
        })
      })
    )
  }

  useEffect(() => {
    fetchMessages();
  }, [])

  const fetchMessages = async () => {
    const response = await fetch("http://localhost:3000/messages")
    const data = await response.json();
    setMessagesAndScrollDown(data);
  }

  const setMessagesAndScrollDown = (data) => {
    setMessages(data);
    if(!messagesContainer) return;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  return (
    <div className="App">
      <div className="messageHeader">
        <h1>Messages</h1>
        <p>Guid: {guid}</p>
      </div>
      <div className='messages' id='messages'>
        {messages.map((message) => (
          <div className='message' key={message.id}>
            <p>{message.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
