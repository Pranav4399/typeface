import React from "react";
import "../styles/styles.scss";
import { ChatMessage } from "./ChatApp";
import { FaReply } from "react-icons/fa";

interface MessageProps {
  message: ChatMessage;
  onReply: () => void;
}

const Message: React.FC<MessageProps> = ({ message, onReply }) => {
  return (
    <div className="message">
      <div className="reply-container">
        {message.replyTo.text && (
          <div className="original-message">{message.replyTo.text}</div>
        )}
      </div>
      <div className="answer-container">
        <div className="reply-message">{message.text}</div>
        <div className="reply-icon-container" onClick={onReply}>
          <FaReply className="reply-icon" onClick={onReply} />
        </div>
      </div>
    </div>
  );
};

export default Message;
