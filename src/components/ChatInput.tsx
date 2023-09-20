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
      console.log(message);
      onSendMessage(message, replyTo);
      setMessage("");
    }
  };

  // If the input is on reply mode and user presses cancel, the text is sent as null.
  // Further check happens in the handleSendMessage function where the components goes into initial state.
  const handleCancel = () => {
    onSendMessage("", { id: replyTo.id, text: null })
    setMessage("");
  }

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      {replyTo.id !== null && <div className="reply-container">
        <span style={{color: "#333333"}}>{"> "}</span>{replyTo.text}
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
