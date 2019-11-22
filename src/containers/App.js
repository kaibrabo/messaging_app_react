import React, { Component } from "react";
import firebase from "../config";
import CreateRoom from "../components/CreateRoom";
import RoomList from "../components/RoomList";
import MessageList from "../components/MessageList";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomsRef: firebase.firestore().collection("rooms"), // Calls db once
      rooms: [],
      newRoom: "",
      currentRoom: {
        name: "",
        messages: [{ content: "select a person", sentAt: Date.now }]
      }
    };
  }

  // Initial GET from firebase "rooms" collection
  getDb(db) {
    db.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let room = doc.data();
        room.key = doc.id;
        this.setState({
          rooms: this.state.rooms.concat(room)
        });
      });
    });
  }

  // Create new room
  createRoom() {
    const room = { name: this.state.newRoom, messages: [] };

    // Adds room to firebase
    firebase
      .firestore()
      .collection("rooms")
      .add(room);

    // Adds room to state
    this.setState({
      rooms: [...this.state.rooms, room],
      newRoom: "",
      currentRoom: room
    });
  }

  // Delete room from state and firebase
  deleteRoom(index, id) {
    // Removes room from state.rooms
    const rooms = this.state.rooms;
    rooms.splice(index, 1);
    this.setState({ rooms });

    // Removes room from firebase
    const roomsRef = this.state.roomsRef;
    return roomsRef.doc(`${id}`).delete();
  }

  // Select Room to make current room
  selectRoom() {}

  // EVENT HANDLERS
  // using arrow func.'s negate method.bind(this) in constructor
  handleChange = e => {
    this.setState({ newRoom: e.target.value });
  };

  handleSubmit = e => {
    this.createRoom();
    e.preventDefault();
  };

  handleDeleteRoom = (index, id) => {
    this.deleteRoom(index, id);
  };

  handleSelectRoom = (r, i) => {
    this.setState({ currentRoom: r });
  };

  // LIFECYCLE METHODS

  componentDidMount() {
    this.getDb(this.state.roomsRef);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Messaging App</h1>
        </header>

        <div className="messages-container">
          <div className="messages-left">
            <CreateRoom
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              newRoom={this.state.newRoom}
            />
            <RoomList
              rooms={this.state.rooms}
              handleSelectRoom={this.handleSelectRoom}
              handleDeleteRoom={this.handleDeleteRoom}
            />
          </div>

          <div className="messages-right">
            <MessageList
              currentRoom={this.state.currentRoom}
              messages={this.state.currentRoom.messages}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
