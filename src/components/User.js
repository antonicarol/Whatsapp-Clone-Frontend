import React from "react";
import "./css/User.css";
import { Avatar } from "@material-ui/core";
import { useStateValue } from "../contexts/StateProvider";
import axios from "../db/axios";
function User({ name, photo }) {
  const [{ user }] = useStateValue();

  const inviteUser = () => {
    axios
      .post("/rooms/new", {
        name: name,
        users: [
          {
            user: name,
            photo: photo,
          },
          {
            user: user.displayName,
            photo: user.photoURL,
          },
        ],
      })
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => alert(err));
  };
  return (
    <div onClick={inviteUser} className="user">
      <Avatar src={photo} />
      <h4>{name}</h4>
    </div>
  );
}

export default User;
