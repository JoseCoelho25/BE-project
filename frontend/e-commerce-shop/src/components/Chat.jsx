import React, {useEffect, useState} from 'react'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:5000')

const Chat = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [messageReceived, setMessageReceived] = useState('')

  const sendMessage = () => {
    socket.emit('send_message', {message})
    setMessages([...messages, {sender: 'me', message: message}])
    setMessage('')
  }

  socket.on('message', (data) => {
    console.log(data)
  })

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages([...messages, {sender: 'other', message: data.message}])
      setMessageReceived(data.message)
    })
  }, [socket, messages])
  

  return (
    <div className='fixed bottom-20 bg-gray-500 border-'>
      <h1>Chat</h1>
      <div id="chat">
        {messages.map((msg, index) => (
          <div key={index}>
            <p>{msg.sender}: {msg.message}</p>
          </div>
        ))}
      </div>
      <input placeholder="Message..." value={message} onChange={(event) => {
        setMessage(event.target.value)
      }} onKeyPress={(event) => {
        if (event.key === 'Enter') {
        sendMessage()
        }
      }}/>

      <button onClick={sendMessage}>Enviar mensagem</button>
    </div>
  )
}

export default Chat
