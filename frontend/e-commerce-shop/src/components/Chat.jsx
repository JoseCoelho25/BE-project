import React, {useEffect, useState} from 'react'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:5000')

const Chat = () => {
  const [message, setMessage] = useState('')
  const [messageReceived, setMessageReceived] = useState('')
  const sendMessage = () => {
    // const message = document.querySelector('input').value
    socket.emit('send_message', {message})
  }
    socket.on('message', (data) => {
      console.log(data)
     })
    
     useEffect(() => {
        socket.on('receive_message', (data) => {
          setMessageReceived(data.message)
        })
     }, [socket])
    
  return (
    <div>
        <h1>Chat</h1>
    <div id="chat">

    </div>
    <input placeholder="Message..." onChange={(event) => {
      setMessage(event.target.value)
    }}/>
    <button onClick={sendMessage}>Enviar mensagem</button>
    <h1>Message:</h1>
    {messageReceived}
    </div>
  )
}

export default Chat