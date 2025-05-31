import React from 'react';

interface ChatBubbleProps {
  message: string;
  sender: 'user' | 'avatar';
  timestamp: Date;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, sender, timestamp }) => {
  const isUser = sender === 'user';
  
  // Format time to display
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[75%] rounded-2xl px-4 py-2 ${
          isUser 
            ? 'bg-primary-600 text-white rounded-br-none ml-auto' 
            : 'bg-neutral-200 text-neutral-900 rounded-bl-none'
        }`}
      >
        <p>{message}</p>
        <div className={`text-xs mt-1 ${isUser ? 'text-primary-100' : 'text-neutral-500'}`}>
          {formatTime(timestamp)}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;