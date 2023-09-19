import React, { useState, useRef, useEffect } from "react";
import "../styles/styles.scss";
import { ReplyTo } from "./ChatApp";

interface ChatInputProps {
  onSendMessage: any;
  replyTo: ReplyTo;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, replyTo }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [replyTo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== "") {
      onSendMessage(message, replyTo);
      setMessage("");
    }
  };

  const handleCancel = () => {
    onSendMessage("", { id: replyTo.id, text: null })
    setMessage("");
  }

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      {replyTo.id !== null && <div className="reply-container">
        {replyTo.text}
      </div>}
      <div className="send-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={replyTo.id !== null ? "Replying" : "Type a message..."}
          ref={inputRef}
        />
        <button type="submit">Send</button>
        {replyTo.id !== null && (
          <button
            type="button"
            onClick={handleCancel}
          >
            Cancel Reply
          </button>
        )}
      </div>
    </form>
  );
};

export default ChatInput;
