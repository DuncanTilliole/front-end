import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useAction, getMessages, sendMessage, getBotResponse } from 'wasp/client/operations';

const ChatPage = () => {
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const getMessagesFn = useQuery(getMessages, { conversationId });
  const sendMessageFn = useAction(sendMessage);
  const getBotResponseFn = useAction(getBotResponse);

  useEffect(() => {
    getMessagesFn();
  }, [getMessagesFn]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    await sendMessageFn({ conversationId, text: newMessage });
    setNewMessage('');
    const botResponse = await getBotResponseFn({ conversationId, messageText: newMessage });
    setMessages((prevMessages) => [...prevMessages, botResponse]);
  };

  return (
    <div className='p-4'>
      {messages.map((message) => (
        <div key={message.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
          <p>{message.text}</p>
          <p>{message.isBot ? 'Bot' : 'User'}</p>
        </div>
      ))}
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='Type a message'
          className='px-1 py-2 border rounded text-lg'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;