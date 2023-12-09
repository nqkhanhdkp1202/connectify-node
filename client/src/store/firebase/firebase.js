// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXPCm-FBUzUyXYfbrojar7iFk9ZTxP7do",
  authDomain: "connectify-96713.firebaseapp.com",
  projectId: "connectify-96713",
  storageBucket: "connectify-96713.appspot.com",
  messagingSenderId: "941767799015",
  appId: "1:941767799015:web:ae79a308984966a9e73242"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };