import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDIzOwZIgHoqCJmDZ_hCjWQ_SrfVdMA6gc",
  authDomain: "fb--login-d37d3.firebaseapp.com",
  projectId: "fb--login-d37d3",
  storageBucket: "fb--login-d37d3.appspot.com",
  messagingSenderId: "626669721770",
  appId: "1:626669721770:web:86094c1f4a67637c53d8d3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { firebase, db, auth, storage}