import React from "react";

const CreateRoom = props => {
  return (
    <form className="create-room" onSubmit={props.handleSubmit}>
      <input
        className="search-input"
        type="text"
        name="name"
        placeholder="new message"
        onChange={props.handleChange}
        value={props.newRoom}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default CreateRoom;
