import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyB1XHJrkhV0pjfFH4sJMZeFtaxJXg2XxXA",
  authDomain: "notepad-78aae.firebaseapp.com",
  projectId: "notepad-78aae",
  storageBucket: "notepad-78aae.appspot.com",
  messagingSenderId: "1076421173466",
  appId: "1:1076421173466:web:746d342f7a7b8c375b85e3",
  measurementId: "G-9X5LK2QM4Q"
};

const app = !firebase.apps.length
	? firebase.initializeApp(firebaseConfig)
	: firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
