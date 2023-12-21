// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; //optener la autenticación

const firebaseConfig = {
  apiKey: "AIzaSyB5m5QHhnzlir4XQj5dCbZiSJgDfdXNU8c",
  authDomain: "authentication-app-ec68a.firebaseapp.com",
  projectId: "authentication-app-ec68a",
  storageBucket: "authentication-app-ec68a.appspot.com",
  messagingSenderId: "513259878646",
  appId: "1:513259878646:web:25eaff55c8ddc1b2ddd4d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };