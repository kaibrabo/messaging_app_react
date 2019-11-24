import React from "react";

const MessageList = props => {
  const messages = props.messages.map((m, i) => {
    return (
      <li className="message-item" key={i}>
        <p>{m.content}</p>
      </li>
    );
  });

  return (
    <section className="messages-list">
      <p className="messages-list-title">
        {props.currentRoom.name.length !== 0
          ? props.currentRoom.name
          : "Messages"}
      </p>

      <div className="messages-list-display">
        {props.messages.length === 0 ? <p>loading...</p> : <ul>{messages}</ul>}
      </div>
    </section>
  );
};

export default MessageList;
