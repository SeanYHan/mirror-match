import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Smile, Paperclip } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ChatBubble from '../components/chat/ChatBubble';
import TypingIndicator from '../components/chat/TypingIndicator';

const ChatPage: React.FC = () => {
  const { user, avatar, chatHistory, addMessage } = useApp();
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const initialGreetingSent = useRef(false);
  
  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);
  
  // Initial greeting if chat is empty
  useEffect(() => {
    if (chatHistory.length === 0 && avatar && !initialGreetingSent.current) {
      initialGreetingSent.current = true;
      setIsTyping(true);
      
      setTimeout(() => {
        addMessage('avatar', `Hi ${user?.name || 'there'}! I'm ${avatar.name}, your dating coach. How can I help you today?`);
        setIsTyping(false);
      }, 1500);
    }
  }, [chatHistory, avatar, user?.name, addMessage]);
  
  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    // Add user's message
    addMessage('user', inputMessage);
    setInputMessage('');
    
    // Simulate avatar typing
    setIsTyping(true);
    
    // Generate a response based on the input
    const response = generateResponse(inputMessage);
    
    // Add avatar's response after a delay
    setTimeout(() => {
      addMessage('avatar', response);
      setIsTyping(false);
    }, Math.random() * 1000 + 1000);
  };
  
  // Simple response generator for demo purposes
  const generateResponse = (message: string) => {
    const lowercaseMsg = message.toLowerCase();
    
    if (lowercaseMsg.includes('hello') || lowercaseMsg.includes('hi')) {
      return `Hi there! It's great to chat with you. How are you feeling about your dating journey today?`;
    }
    
    if (lowercaseMsg.includes('nervous') || lowercaseMsg.includes('anxiety')) {
      return `It's completely normal to feel nervous about dating. Remember that everyone feels this way sometimes. One tip is to focus on asking questions about the other person - this takes pressure off you and shows you're interested in them.`;
    }
    
    if (lowercaseMsg.includes('confidence')) {
      return `Building confidence is key to successful dating. I see from your profile that your confidence score is ${user?.skills.confidence}/10. Try practicing positive self-talk before dates, and remember that confidence comes from preparation. Would you like some specific exercises to boost your dating confidence?`;
    }
    
    if (lowercaseMsg.includes('conversation') || lowercaseMsg.includes('talk')) {
      return `Great conversations flow naturally, but having some topics ready can help. Since you're interested in ${user?.interests[0] || 'various topics'}, you could start by asking about their favorite ${user?.interests[0] || 'interests'}. Open-ended questions work best - they allow the other person to share more about themselves.`;
    }
    
    if (lowercaseMsg.includes('tip') || lowercaseMsg.includes('advice')) {
      return `Here's a tip: The 70/30 rule is helpful - aim to listen 70% of the time and talk 30%. This shows you're interested in getting to know them. I notice your listening skill is at ${user?.skills.listening}/10, so being mindful of this balance could be beneficial for you.`;
    }
    
    if (lowercaseMsg.includes('compliment') || lowercaseMsg.includes('praise')) {
      return `Compliments should be genuine and specific. Instead of "You look nice," try "That color really brings out your eyes" or "I love how passionate you sound when you talk about your work." Authentic compliments show you're paying attention to details.`;
    }
    
    // Default responses
    const defaultResponses = [
      `That's an interesting point. Based on your skills profile, I think you could approach this by focusing on your strength in ${Object.entries(user?.skills || {}).sort((a, b) => b[1] - a[1])[0][0]}.`,
      `I see. Given what I know about your dating style, have you considered trying a different approach next time?`,
      `Thanks for sharing that. Would you like to practice this scenario together? I can give you real-time feedback.`,
      `I understand. Many people in Boston feel the same way about dating. Let's work on some strategies that might work well in this city's dating culture.`,
      `That's a good question. Let's explore some options that align with your interests in ${user?.interests[0] || 'various activities'}.`
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card flex flex-col h-[calc(100vh-13rem)]">
          {/* Chat header */}
          <div className="p-4 border-b border-neutral-200 flex items-center">
            {avatar && (
              <img src={avatar.image} alt={avatar.name} className="w-10 h-10 rounded-full mr-3" />
            )}
            <div>
              <h2 className="font-semibold text-neutral-900">{avatar?.name || 'Coach'}</h2>
              <p className="text-xs text-neutral-500">Dating Coach</p>
            </div>
          </div>
          
          {/* Chat messages */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {chatHistory.map((msg, index) => (
              <ChatBubble
                key={index}
                message={msg.message}
                sender={msg.sender}
                timestamp={msg.timestamp}
              />
            ))}
            
            {isTyping && <TypingIndicator />}
          </div>
          
          {/* Input area */}
          <div className="p-4 border-t border-neutral-200">
            <div className="flex items-end">
              <button className="text-neutral-400 hover:text-neutral-600 p-2 rounded-full">
                <Paperclip size={20} />
              </button>
              <button className="text-neutral-400 hover:text-neutral-600 p-2 rounded-full">
                <Smile size={20} />
              </button>
              <div className="flex-1 mx-2">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="w-full border border-neutral-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={1}
                />
              </div>
              <button 
                onClick={handleSendMessage}
                disabled={inputMessage.trim() === ''}
                className={`p-2 rounded-full ${
                  inputMessage.trim() === '' 
                    ? 'bg-neutral-200 text-neutral-400' 
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatPage;