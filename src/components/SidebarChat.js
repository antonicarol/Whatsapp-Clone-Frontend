import React from "react";
import "./css/SidebarChat.css";
import { Avatar } from "@material-ui/core";
import { useStateValue } from "../contexts/StateProvider";
import { actionTypes } from "../contexts/reducer";
function SidebarChat({ title }) {
  const [{ rooms }, dispatch] = useStateValue();

  const setRoom = () => {
    dispatch({
      type: actionTypes.SET_DETAIL_ROOM,
      room: rooms.find((room) => room.name === title),
    });
  };
  return (
    <div onClick={setRoom} className="sidebarChat">
      <Avatar />
      <div className="sidebarChat__info">
        <h2>{title}</h2>
        <p>Last message on the room</p>
      </div>
    </div>
  );
}

export default SidebarChat;
