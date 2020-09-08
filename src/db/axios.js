import axios from "axios";

const localhost = "http://localhost:9000";
const heroku = "https://whatsapp-clone-backend.herokuapp.com";

const instance = axios.create({
  baseURL: localhost,
});

export default instance;
