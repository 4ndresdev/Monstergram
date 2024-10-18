import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4ZrneMRNSP_zAy1RE5_dKQsFoW-da4FY",
  authDomain: "monstergram-a1e47.firebaseapp.com",
  DatabaseURL: "https://monstergram-a1e47-default-rtdb.firebaseio.com/",
  projectId: "monstergram-a1e47",
  storageBucket: "monstergram-a1e47.appspot.com",
  messagingSenderId: "469664113729",
  appId: "1:469664113729:web:e598fcdd458e0c798a12c0",
  measurementId: "G-12RF34FSYX",
};

const app = initializeApp(firebaseConfig);

getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
