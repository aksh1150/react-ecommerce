import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA9M-XjPigltsVLeVhwHz9yaBFNPvS8rPE",
  authDomain: "ecom-20a23.firebaseapp.com",
  databaseURL: "https://ecom-20a23.firebaseio.com",
  projectId: "ecom-20a23",
  storageBucket: "ecom-20a23.appspot.com",
  messagingSenderId: "1088694565396",
  appId: "1:1088694565396:web:e2e333dfac6c764a0a0501",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
