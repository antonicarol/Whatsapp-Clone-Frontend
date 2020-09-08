import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAP53Kn9aitRTGVeT3UzDgi9G-bYSFg-BM",
  authDomain: "whatsapp-clone-602bb.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-602bb.firebaseio.com",
  projectId: "whatsapp-clone-602bb",
  storageBucket: "whatsapp-clone-602bb.appspot.com",
  messagingSenderId: "928622092001",
  appId: "1:928622092001:web:c43319f32dc5f0ca44e1a0",
});

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
