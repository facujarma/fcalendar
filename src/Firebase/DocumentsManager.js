import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "./conection.js";
import { onAuthStateChanged } from "firebase/auth";

var uid;
onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
  } else {
    uid = "";
  }
});

export const setUserEvents = async (events) => {
  const docRef = doc(db, "events", uid);
  await setDoc(docRef, events);
};

export const getUserEvents = async () => {
  const docRef = doc(db, "events", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

export const setUserCategories = async (categories) => {
  const docRef = doc(db, "categories", uid);
  await setDoc(docRef, categories);
};

export const getUserCategories = async () => {
  const docRef = doc(db, "categories", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    setUserCategories({ Otros: "#444444" });
  }
};
