import React from "react";

const RoomList = props => {
  return (
    <section className="room-list">
      {props.roomsSize.length === 0 ? (
        <p>loading...</p>
      ) : (
        <ul>{props.rooms}</ul>
      )}
    </section>
  );
};

export default RoomList;
