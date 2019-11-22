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
      currentRoom: {}
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
    // Adds room to firebase
    firebase
      .firestore()
      .collection("rooms")
      .add({ name: this.state.newRoom });

    // Adds room to state
    this.setState({
      rooms: [...this.state.rooms, { name: this.state.newRoom }],
      newRoom: ""
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

  // LIFECYCLE METHODS

  componentDidMount() {
    this.getDb(this.state.roomsRef);
  }

  render() {
    const rooms = this.state.rooms.map((r, i) => (
      <li className="room-item" key={i}>
        <p className="pointer">{r.name}</p>
        <p className="pointer" onClick={e => this.handleDeleteRoom(i, r.key)}>
          x
        </p>
      </li>
    ));

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
            <RoomList rooms={rooms} roomsSize={this.state.rooms} />
          </div>

          <div className="messages-right">
            <MessageList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
