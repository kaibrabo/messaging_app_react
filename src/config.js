import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCLbHSQ0osnZ8GzfM7FwDyxH0a8C8trAYw",
    authDomain: "react-chat-app-v1.firebaseapp.com",
    databaseURL: "https://react-chat-app-v1.firebaseio.com",
    projectId: "react-chat-app-v1",
    storageBucket: "react-chat-app-v1.appspot.com",
    messagingSenderId: "839874949718",
    appId: "1:839874949718:web:38d114b9a2598328"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;