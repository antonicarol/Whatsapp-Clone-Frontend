import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Pusher from "pusher-js";
import axios from "./db/axios";
import Login from "./components/Login";
import { useStateValue } from "./contexts/StateProvider";
import { actionTypes } from "./contexts/reducer";
import Users from "./components/Users";

function App() {
  const [{ user, rooms }, dispatch] = useStateValue();
  //FETCHING THE DATA FROM THE DB

  useEffect(() => {
    const userQuery = `?user=${user?.displayName}&imgUrl=${encodeURIComponent(
      user?.photoURL
    )}`;
    axios.get(`/rooms/${userQuery}`).then((response) => {
      dispatch({
        type: actionTypes.SET_ROOMS,
        rooms: response.data,
      });
    });
  }, [user, dispatch]);

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
  }, [rooms, dispatch]);

  useEffect(() => {
    axios.get("/users/all").then((result) => {
      dispatch({
        type: actionTypes.SET_ALL_USERS,
        users: result.data,
      });
    });
  }, [user, dispatch]);

  console.log(rooms);

  return (
    <div className="app">
      {user === null ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Chat />
          <Users />
        </div>
      )}
    </div>
  );
}

export default App;
