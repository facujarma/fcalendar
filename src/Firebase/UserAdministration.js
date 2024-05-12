import { auth } from "../Firebase/conection";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const registerUser = async (email, password) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredentials;
  } catch (error) {
    console.log(error);
  }
};

export const logOutUser = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error);
  }
};

export const logInUser = async (email, password) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredentials;
  } catch (error) {
    console.log(error);
  }
};
