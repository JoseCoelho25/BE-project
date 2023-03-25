import React from 'react'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:5000')

const Chat = () => {
  const sendMessage = () => {
    // const message = document.querySelector('input').value
    // socket.emit('message', message)
  }
    socket.on('message', (data) => {
      console.log(data)
     })
    
    
  return (
    <div>
        <h1>Chat</h1>
    <div id="chat">

    </div>
    <input placeholder="Message..."/>
    <button onClick={sendMessage}>Enviar mensagem</button>
    </div>
  )
}

export default Chat