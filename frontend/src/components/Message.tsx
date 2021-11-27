import React from "react";
import "./Message.scss";

interface MessageType {
  type: "error" | "warning" | "info";
  text?: string;
}

const Message: React.FC<MessageType> = ({
  type,
  text = "Error occured. Please try again later or contact us directly.",
}) => {
  return <div className={`message message-${type}`}>{text}</div>;
};

export default Message;
