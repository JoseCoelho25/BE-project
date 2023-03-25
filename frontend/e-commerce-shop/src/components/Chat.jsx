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
    <div className='fixed bottom-20 bg-gray-500 rounded-lg p-4'>
      <h1 className='text-center text-xl font-bold mb-4'>Chat</h1>
      <div id="chat"className='grid grid-cols-1 gap-y-4 '>
        {messages.map((msg, index) => (
          <div key={index} className=''>
            {msg.sender === 'other' ? (
              <p className='bg-blue-400 rounded-lg w-1/2 px-2'>{msg.sender}: {msg.message}</p>
            ): (
              <div className='flex justify-end'>
                <p className='bg-red-400 w-1/2 rounded-lg px-2'>{msg.sender}: {msg.message}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <input placeholder="Message..." value={message} onChange={(event) => {
        setMessage(event.target.value)
      }} onKeyPress={(event) => {
        if (event.key === 'Enter') {
        sendMessage()
        }
      }}
        className='mt-6 px-2'
      />

      <button onClick={sendMessage} className='border-black border-2 rounded-full px-2 ml-2'>Enviar mensagem</button>
    </div>
  )
}

export default Chat
