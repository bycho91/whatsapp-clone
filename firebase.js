import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDgPxz5M645fLq1K8p3GR1bv08XKYFxATA",
  authDomain: "whatsapp-clone-dd18d.firebaseapp.com",
  projectId: "whatsapp-clone-dd18d",
  storageBucket: "whatsapp-clone-dd18d.appspot.com",
  messagingSenderId: "1098474279705",
  appId: "1:1098474279705:web:a6fb5aced879c11a666b88",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
