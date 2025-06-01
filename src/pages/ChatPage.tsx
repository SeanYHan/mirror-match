import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Smile, Paperclip } from "lucide-react";
import { useApp } from "../context/AppContext";
import ChatBubble from "../components/chat/ChatBubble";
import TypingIndicator from "../components/chat/TypingIndicator";
import OpenAI from "openai";

// Debug environment variable
console.log("API Key:", import.meta.env.VITE_OPENAI_API_KEY);

// Initialize the OpenAI client with your API key
const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Only use this in development
});

const ChatPage: React.FC = () => {
  const { user, avatar, chatHistory, addMessage } = useApp();
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const initialGreetingSent = useRef(false);

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Initial greeting if chat is empty
  useEffect(() => {
    if (chatHistory.length === 0 && avatar && !initialGreetingSent.current) {
      initialGreetingSent.current = true;
      setIsTyping(true);

      setTimeout(() => {
        addMessage(
          "avatar",
          `Hi ${user?.name || "there"}! I'm ${
            avatar.name
          }, your dating coach. How can I help you today?`
        );
        setIsTyping(false);
      }, 1500);
    }
  }, [chatHistory, avatar, user?.name, addMessage]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    // Add user's message
    addMessage("user", inputMessage);
    setInputMessage("");

    // Simulate avatar typing
    setIsTyping(true);

    try {
      // Generate a response based on the input
      const response = await generateResponse(inputMessage);

      // Add avatar's response after a delay
      setTimeout(() => {
        addMessage("avatar", response);
        setIsTyping(false);
      }, Math.random() * 1000 + 1000);
    } catch (error) {
      console.error("Error in handleSendMessage:", error);
      setIsTyping(false);
      addMessage(
        "avatar",
        "I'm sorry, I encountered an error while processing your message."
      );
    }
  };

  // Simple response generator for demo purposes
  const generateResponse = async (message: string) => {
    try {
      const response = await client.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a dating coach. Format your responses in markdown with the following structure:
- Use **bold** for emphasis on key points
- Use bullet points for lists
- Use > for important quotes or mantras
- Use --- for section breaks
- Keep responses concise and focused
- Use emojis sparingly and appropriately
- Structure longer responses with clear headings using ##`,
          },
          {
            role: "user",
            content: message,
          },
        ],
      });

      return (
        response.choices[0]?.message?.content ||
        "I'm sorry, I couldn't generate a response."
      );
    } catch (error) {
      console.error("Error generating response:", error);
      return "I'm sorry, I encountered an error while processing your message.";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
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
              <img
                src={avatar.image}
                alt={avatar.name}
                className="w-10 h-10 rounded-full mr-3"
              />
            )}
            <div>
              <h2 className="font-semibold text-neutral-900">
                {avatar?.name || "Coach"}
              </h2>
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
                disabled={inputMessage.trim() === ""}
                className={`p-2 rounded-full ${
                  inputMessage.trim() === ""
                    ? "bg-neutral-200 text-neutral-400"
                    : "bg-primary-600 text-white hover:bg-primary-700"
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
