import { auth } from "../Firebase/conection";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export const registerUser = async (name, email, password) => {
  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await updateProfile(auth.currentUser, { displayName: name });
  return userCredentials;
};

export const logOutUser = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error);
  }
};

export const logInUser = async (email, password) => {
  const userCredentials = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredentials;
};

export const updateName = async (name) => {
  updateProfile(auth.currentUser, { displayName: name });
};
