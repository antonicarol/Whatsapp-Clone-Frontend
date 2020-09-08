import React from "react";
import "./css/Users.css";
import { useStateValue } from "../contexts/StateProvider";
import User from "./User";
function Users() {
  const [{ allUsers }] = useStateValue();
  return (
    <div className="users">
      <h1> All users </h1>
      {allUsers?.map((user) => (
        <User name={user.name} photo={user.photo} />
      ))}
    </div>
  );
}

export default Users;
