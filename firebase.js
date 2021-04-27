import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB00_fsNf1FcRm9afFjbZY5YP6YERSibFQ",
  authDomain: "signal-clone-f2253.firebaseapp.com",
  projectId: "signal-clone-f2253",
  storageBucket: "signal-clone-f2253.appspot.com",
  messagingSenderId: "891617319304",
  appId: "1:891617319304:web:ae7aac26ac76898493423d"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
