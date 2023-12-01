// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoc6bXl_O0DIPMJETJD9YmBMbi2KFxkrw",
  authDomain: "game-e3326.firebaseapp.com",
  projectId: "game-e3326",
  storageBucket: "game-e3326.appspot.com",
  messagingSenderId: "795659700978",
  appId: "1:795659700978:web:c690376ca37c87519ede6b"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getFirestore()
export { app, database }



