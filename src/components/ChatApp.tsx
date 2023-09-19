import React, { useState } from "react";
import "../styles/styles.scss";
import Message from "./Message";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";

export interface ChatMessage {
  id: string;
  text: string;
  isReply: boolean;
  replyTo: ReplyTo;
}

export interface ReplyTo {
  id: string | null;
  text: string | null;
}

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [replyTo, setReplyTo] = useState<ReplyTo>({
    id: null,
    text: null,
  });

  const handleSendMessage = (message: string, replyTo: ReplyTo) => {
    if(replyTo.id !== null && replyTo.text === null) {
      setReplyTo({
        id: null,
        text: null,
      });
      return;
    }
    
    const newMessage: ChatMessage = {
      id: uuidv4(),
      text: message,
      isReply: replyTo.id === null ? false : true,
      replyTo: replyTo,
    };

    setMessages([newMessage, ...messages]);

    setReplyTo({
      id: null,
      text: null,
    });
    
  };

  return (
    <div className="chat-container">
      <div className="message-container">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} onReply={() => setReplyTo({
            id: msg.id,
            text: msg.text,
          })} />
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} replyTo={replyTo} />
    </div>
  );
};

export default ChatApp;
