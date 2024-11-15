import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKt2OnnmYSE7CYOHZVHxfBO5LzxBjVTnw",
  authDomain: "curso-8cc1d.firebaseapp.com",
  projectId: "curso-8cc1d",
  storageBucket: "curso-8cc1d.firebasestorage.app",
  messagingSenderId: "295621103461",
  appId: "1:295621103461:web:4f65516d425f128f87db8c",
  measurementId: "G-J8Q7HX989F",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };
