import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, getConversations } from 'wasp/client/operations';

const ConversationsPage = () => {
  const { data: conversations, isLoading, error } = useQuery(getConversations);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {conversations.map((conversation) => (
        <Link to={`/conversation/${conversation.id}`} key={conversation.id} className='bg-blue-200 p-4 mb-4 rounded-lg block'>
          <div>{conversation.title}</div>
          <div>{conversation.lastMessage}</div>
        </Link>
      ))}
    </div>
  );
}

export default ConversationsPage;