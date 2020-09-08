import React from "react";
import "./css/Login.css";
import { auth, provider } from "../firebase/firebase";
import { useStateValue } from "../contexts/StateProvider";
import { actionTypes } from "../contexts/reducer";
import axios from "../db/axios";
function Login() {
  const [state, dispatch] = useStateValue();
  const logIn = (e) => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.user);
        axios
          .post("/users/new", {
            name: result.user.displayName,
            photo: result.user.photoURL,
          })
          .then(
            dispatch({
              type: actionTypes.SET_USER,
              user: result.user,
            })
          )
          .catch((err) => alert(err));
      })
      .catch((err) => alert(err));
  };
  return (
    <div className="login">
      <img
        alt=""
        src="https://logos-world.net/wp-content/uploads/2020/05/WhatsApp-Emblem.png"
      />
      <button onClick={logIn}>Log in With Google</button>
    </div>
  );
}

export default Login;
