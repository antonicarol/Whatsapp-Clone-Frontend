import React from "react";
import "./css/Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { Avatar, IconButton } from "@material-ui/core";
import SidebarChat from "./SidebarChat";
import { useStateValue } from "../contexts/StateProvider";

function Sidebar() {
  const [{ user, rooms }] = useStateValue();

  console.log(user);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input placeholder="Search or start a new chat" type="text" />
        </div>
      </div>
      <p> To create a chat, send an invitation to users at the right!</p>
      <div className="sidebar__chats">
        {rooms?.map(({ name, users }) => (
          <>
            <SidebarChat title={name} users={users} />
          </>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
