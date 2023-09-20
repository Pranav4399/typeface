import React from "react";
import "../styles/styles.scss";
import { ChatMessage, ReplyTo } from "./ChatApp";
import { FaReply } from "react-icons/fa";

interface MessageProps {
  message: ChatMessage;
  setReplyTo: React.Dispatch<React.SetStateAction<ReplyTo>>;
  level?: number;
  showLines: boolean;
}

const colors = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FF00FF",
  "#00FFFF",
  "#FFFF00",
  "#FFA500",
];

const Message: React.FC<MessageProps> = ({
  message,
  setReplyTo,
  level = 0,
  showLines,
}) => {
  const handleSetReply = (id: string, text: string) => {
    setReplyTo({
      id,
      text,
    });
  };

  // Function to render replies of each parent message through a recursive loop.
  const renderReplies = (replies: ChatMessage[], parentLevel: number) => {
    if (!replies || replies.length === 0) return null;

    return (
      <>
        {replies.map((msg) => {
          const replyLevel = (parentLevel + 1) % 14;
          const color = colors[replyLevel % 7];
          return (
            <div
              className="reply-container"
              key={msg.id}
              style={showLines ? { borderRight: `2px solid ${color}` } : {}} // If showLines toggle is off, the border won't be visible
            >
              <div className="reply-child">
                <div className="timestamp">{msg.timestamp}</div>
                <div className="reply-message-container">
                  <div className="reply-message">{msg.text}</div>
                  <div className="reply-icon-container">
                    <FaReply
                      className="reply-icon"
                      onClick={() => handleSetReply(msg.id, msg.text)}
                    />
                  </div>
                </div>
              </div>
              {renderReplies(msg.replies, replyLevel)}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="message">
      <div className="parent-container">
        <div className="timestamp">{message.timestamp}</div>
        <div className="parent-message">
          {message.text}
          <div className="reply-icon-container">
            <FaReply
              className="reply-icon"
              onClick={() => handleSetReply(message.id, message.text)}
            />
          </div>
        </div>
      </div>
      {renderReplies(message.replies, level)} {/* Pass the initial level */}
    </div>
  );
};

export default Message;
