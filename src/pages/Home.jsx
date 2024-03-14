import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, getConversations } from 'wasp/client/operations';

const HomePage = () => {
  const { data: conversations, isLoading, error } = useQuery(getConversations);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>Welcome to the Chatbot Interface!</h1>
      <p className='text-lg mb-4'>Start engaging in conversations with our chatbot.</p>
      <Link to='/conversations' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Go to Conversations</Link>
    </div>
  );
}

export default HomePage;