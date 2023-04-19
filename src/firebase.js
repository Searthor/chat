
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2GY3Zu0fbXkJIz5Q6iebt9B50QylnmIM",
  authDomain: "test123-30850.firebaseapp.com",
  projectId: "test123-30850",
  storageBucket: "test123-30850.appspot.com",
  messagingSenderId: "740818595740",
  appId: "1:740818595740:web:75b83693b83f2d6972a259"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();