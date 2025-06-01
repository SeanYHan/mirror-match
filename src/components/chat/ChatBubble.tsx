import React from "react";
import ReactMarkdown from "react-markdown";

interface ChatBubbleProps {
  message: string;
  sender: "user" | "avatar";
  timestamp: Date;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  sender,
  timestamp,
}) => {
  const isUser = sender === "user";

  // Format time to display
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2 ${
          isUser
            ? "bg-primary-600 text-white rounded-br-none ml-auto"
            : "bg-neutral-200 text-neutral-900 rounded-bl-none"
        }`}
      >
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              ul: ({ children }) => (
                <ul className="list-disc pl-4 mb-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-4 mb-2">{children}</ol>
              ),
              li: ({ children }) => <li className="mb-1">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary-500 pl-4 my-2 italic">
                  {children}
                </blockquote>
              ),
              h2: ({ children }) => (
                <h2 className="text-lg font-semibold mt-4 mb-2">{children}</h2>
              ),
              strong: ({ children }) => (
                <strong className="font-bold">{children}</strong>
              ),
            }}
          >
            {message}
          </ReactMarkdown>
        </div>
        <div
          className={`text-xs mt-1 ${
            isUser ? "text-primary-100" : "text-neutral-500"
          }`}
        >
          {formatTime(timestamp)}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
