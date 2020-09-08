import React, { useState, useEffect } from "react";
import "./css/Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOulinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from "../db/axios";
import { useStateValue } from "../contexts/StateProvider";
import { actionTypes } from "../contexts/reducer";
import Pusher from "pusher-js";
function Chat() {
  const [input, setInput] = useState("");
  const [{ user, detailRoom, messages }, dispatch] = useStateValue();

  const userNotLogged = detailRoom?.users.find(
    (u) => u.user !== user.displayName
  );

  const sendMessage = (e) => {
    e.preventDefault();

    axios.post("/api/v1/messages/new", {
      roomId: detailRoom._id,
      name: user.displayName,
      message: input,
      timeStamp: Date.now(),
      recieved: false,
    });
    setInput("");
  };

  useEffect(() => {
    axios.get(`/messages/sync/${detailRoom?._id}`).then((response) => {
      console.log(response);
      dispatch({
        type: actionTypes.SET_ROOM_MESSAGES,
        messages: response.data,
      });
    });
  }, [detailRoom, dispatch]);

  //GETTING DATA CHANGES FROM THE DB
  useEffect(() => {
    const pusher = new Pusher("6691ae274f3b1afd4e4b", {
      cluster: "eu",
    });
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (data) {
      dispatch({
        type: actionTypes.SET_MESSAGES_PUSHER,
        message: data,
      });
    });
    // CLEANUP FUNCTION
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, dispatch]);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={userNotLogged?.photo} />
        <div className="chat__headerInfo">
          <h3> {detailRoom?.name} </h3>
          <p>Last seen at ...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOulinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages?.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName && "chat__reciever"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timeStamp">{message.timeStamp}</span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
