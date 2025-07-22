import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2pSekXQuN7GdSjo1WofpdZM02FAwu3xc",
  authDomain: "grocery-sop.firebaseapp.com",
  projectId: "grocery-sop",
  storageBucket: "grocery-sop.firebasestorage.app",
  messagingSenderId: "845256575281",
  appId: "1:845256575281:web:05b3da037270fb91608810"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);