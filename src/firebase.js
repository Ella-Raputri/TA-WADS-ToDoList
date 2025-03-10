import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMR8VQ8bBYaIYtlkbos5A4r1tf0UJwafk",
  authDomain: "todoapp-3f5f8.firebaseapp.com",
  projectId: "todoapp-3f5f8",
  storageBucket: "todoapp-3f5f8.firebasestorage.app",
  messagingSenderId: "43092506157",
  appId: "1:43092506157:web:fd63ea4b1624988b442aa4",
  measurementId: "G-CZY4EV4BMX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth();
export default db;