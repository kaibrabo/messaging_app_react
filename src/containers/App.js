import React, { Component } from "react";
import firebase from "../config";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomsRef: firebase.firestore().collection("rooms"),
      rooms: [],
      newRoom: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteRoom = this.handleDeleteRoom.bind(this);
  }

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

  createRoom() {
    firebase
      .firestore()
      .collection("rooms")
      .add({ name: this.state.newRoom });

    this.setState({
      rooms: [...this.state.rooms, { name: this.state.newRoom }],
      newRoom: ""
    });
  }

  deleteRoom(index, id) {
    // Removes room from state.rooms
    const rooms = this.state.rooms;
    rooms.splice(index, 1);
    this.setState({ rooms });

    // Removes room from firebase
    const roomsRef = this.state.roomsRef;
    return roomsRef.doc(`${id}`).delete();
  }

  handleChange(e) {
    this.setState({ newRoom: e.target.value });
  }

  handleSubmit(e) {
    this.createRoom();
    console.log(this.state.newRoom);
    e.preventDefault();
  }

  handleDeleteRoom(index, id) {
    this.deleteRoom(index, id);
  }

  componentDidMount() {
    this.getDb(this.state.roomsRef);
  }

  render() {
    const rooms = this.state.rooms.map((r, i) => (
      <li
        className="room-item"
        key={i}>
        <p className="pointer">{r.name}</p>
        <p className="pointer" onClick={e => this.handleDeleteRoom(i, r.key)}>x</p>
      </li>
    ));
    console.log(this.state.rooms);

    return (
      <div className="App">
        <header className="App-header">
          <h1>Messaging App</h1>
        </header>

        <div>
          <form className="create-room" onSubmit={this.handleSubmit}>
            <label>
              <input
                type="text"
                name="name"
                placeholder="new message"
                onChange={this.handleChange}
                value={this.state.newRoom}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>

          <section className="room-list">
            {this.state.rooms.length === 0 ? (
              <p>loading...</p>
            ) : (
              <ul>{rooms}</ul>
            )}
          </section>
        </div>
      </div>
    );
  }
}

export default App;
