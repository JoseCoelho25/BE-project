import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {AiOutlineClose} from 'react-icons/ai'

const socket = io.connect('http://localhost:5000');

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageReceived, setMessageReceived] = useState('');
  const [showChat, setShowChat] = useState(false);

  const sendMessage = () => {
    socket.emit('send_message', { message });
    setMessages([...messages, { sender: 'me', message: message }]);
    setMessage('');
  };

  socket.on('message', (data) => {
    console.log(data);
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowChat(true);
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages([...messages, { sender: 'other', message: data.message }]);
      setMessageReceived(data.message);
    });
  }, [socket, messages]);

  if (!showChat) {
    return null;
  }

  return (
    <div className="fixed bottom-20 bg-gray-500 rounded-lg p-4 right-20">
      <div className='flex justify-between mx-4'>
        <h1 className="text-center text-xl font-bold mb-4">Precisa de ajuda?</h1>
        <AiOutlineClose className='w-5 h-5 cursor-pointer' onClick={()=> setShowChat(false)} />
      </div>
      
      <h3 className="text-center text-lg mb-4">Fale com um assistente em tempo real!</h3>
      <div id="chat" className="grid grid-cols-1 gap-y-4 ">
        {messages.map((msg, index) => (
          <div key={index} className="">
            {msg.sender === 'other' ? (
              <p className="bg-blue-400 rounded-lg w-1/2 px-2">
                {msg.sender}: {msg.message}
              </p>
            ) : (
              <div className="flex justify-end">
                <p className="bg-red-400 w-1/2 rounded-lg px-2">
                  {msg.sender}: {msg.message}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <input
        placeholder="Message..."
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            sendMessage();
          }
        }}
        className="mt-6 px-2"
      />

      <button onClick={sendMessage} className="border-black border-2 rounded-full px-2 ml-2">
        Enviar mensagem
      </button>
    </div>
  );
};

export default Chat;
