import React from "react";

const RoomList = props => {
  const rooms = props.rooms.map((r, i) => (
    <li
      className="room-item"
      key={i}
      onClick={e => props.handleSelectRoom(r, i)}
    >
      <p className="pointer">{r.name}</p>
      <p className="pointer" onClick={e => props.handleDeleteRoom(i, r.key)}>
        x
      </p>
    </li>
  ));

  return (
    <section className="room-list">
      <p>recents</p>
      {props.rooms.length === 0 ? <p>loading...</p> : <ul>{rooms}</ul>}
    </section>
  );
};

export default RoomList;
