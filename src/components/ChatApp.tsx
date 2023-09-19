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
  replies: ChatMessage[];
  timestamp: string;
}

export interface ReplyTo {
  id: string | null;
  text: string | null;
}

function getCurrentDateTime() {
  const now = new Date();

  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = now.getFullYear();

  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [replyTo, setReplyTo] = useState<ReplyTo>({
    id: null,
    text: null,
  });

  const handleSendMessage = (message: string, replyTo: ReplyTo) => {

    if (replyTo.id !== null && replyTo.text === null) {
      setReplyTo({
        id: null,
        text: null,
      });
      return;
    }
  
    const addReplyToMessage = (messages: ChatMessage[], replyTo: ReplyTo, newMessage: ChatMessage): ChatMessage[] => {
      for (let msg of messages) {
        if (msg.id === replyTo.id) {
          msg.replies.push(newMessage);
          return messages;
        }
        if (msg.replies.length > 0) {
          const updatedReplies = addReplyToMessage(msg.replies, replyTo, newMessage);
          if (updatedReplies !== msg.replies) {
            return messages.map((m) => (m.id === msg.id ? { ...msg, replies: updatedReplies } : m));
          }
        }
      }
      return messages;
    };
  
    const newMessage: ChatMessage = {
      id: uuidv4(),
      text: message,
      isReply: replyTo.id === null ? false : true,
      replyTo: replyTo,
      timestamp: getCurrentDateTime(),
      replies: [],
    };

    if (replyTo.id !== null) {
      setMessages((prevMessages) => addReplyToMessage(prevMessages, replyTo, newMessage));
    }
    else {
      setMessages([newMessage, ...messages]);
    }

    setReplyTo({
      id: null,
      text: null,
    });
  };
  

  return (
    <div className="chat-container">
      <div className="message-container">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} setReplyTo={setReplyTo} />
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} replyTo={replyTo} />
    </div>
  );
};

export default ChatApp;
