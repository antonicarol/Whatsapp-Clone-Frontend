import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Pusher from "pusher-js";
import axios from "./db/axios";
import Login from "./components/Login";
import { useStateValue } from "./contexts/StateProvider";
import { actionTypes } from "./contexts/reducer";

function App() {
  const [messages, setMessages] = useState([]);
  const [{ user, rooms, detailRoom }, dispatch] = useStateValue();
  //FETCHING THE DATA FROM THE DB

  useEffect(() => {
    axios.get(`/rooms/${user?.displayName}`).then((response) => {
      dispatch({
        type: actionTypes.SET_ROOMS,
        rooms: response.data,
      });
    });
  }, [user]);

  useEffect(() => {
    const pusher = new Pusher("6691ae274f3b1afd4e4b", {
      cluster: "eu",
    });
    const channel = pusher.subscribe("rooms");
    channel.bind("inserted", function (data) {
      dispatch({
        type: actionTypes.SET_ROOMS_PUSHER,
        room: data,
      });
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [rooms]);

  console.log(rooms);
  console.log(user);
  console.log(detailRoom);
  return (
    <div className="app">
      {user === null ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Chat />
        </div>
      )}
    </div>
  );
}

export default App;
