import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const registerUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  return user;
};

export const logoutUser = async () => {
  await signOut(auth);
};

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const addData = async (text: string, id: string) => {
  await addDoc(collection(db, "tasks"), {
    task: text,
    uid: id,
    uploadDate: Timestamp.fromDate(new Date()),
  });
};

export const updateData = async (text: string, id: string) => {
  await setDoc(
    doc(db, "tasks", id),
    {
      task: text,
    },
    { merge: true }
  );
};

export const deleteData = async (id: string) => {
  await deleteDoc(doc(db, "tasks", id));
};

export default app;
