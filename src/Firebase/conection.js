import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBa-lOEw1skKDFrNwnAu0_Tio0Yc2WXDUQ",
  authDomain: "fcalendar-e209a.firebaseapp.com",
  projectId: "fcalendar-e209a",
  storageBucket: "fcalendar-e209a.appspot.com",
  messagingSenderId: "1006264848739",
  appId: "1:1006264848739:web:d3443b00005bbc1825c356",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);