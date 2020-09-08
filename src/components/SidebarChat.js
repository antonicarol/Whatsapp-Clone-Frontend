import React from "react";
import "./css/SidebarChat.css";
import { Avatar } from "@material-ui/core";
import { useStateValue } from "../contexts/StateProvider";
import { actionTypes } from "../contexts/reducer";
function SidebarChat({ title, users }) {
  const [{ rooms, user }, dispatch] = useStateValue();
  const userNotLogged = users.find((u) => u.user !== user.displayName);
  console.log(userNotLogged);
  const setRoom = () => {
    dispatch({
      type: actionTypes.SET_DETAIL_ROOM,
      room: rooms.find((room) => room.name === title),
    });
  };
  return (
    <div onClick={setRoom} className="sidebarChat">
      {console.log(users)}
      <Avatar src={userNotLogged.photo} />
      <div className="sidebarChat__info">
        <h2>{userNotLogged.user}</h2>
        <p>Last message on the room</p>
      </div>
    </div>
  );
}

export default SidebarChat;
