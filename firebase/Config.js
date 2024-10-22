import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, deleteDoc, doc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "placeholder",
  authDomain: "placeholder",
  projectId: "placeholder",
  storageBucket: "placeholder",
  messagingSenderId: "placeholder",
  appId: "placeholder"
};

initializeApp(firebaseConfig);

const firestore = getFirestore();

const ITEMS = 'items';

export { 
  firestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  ITEMS
};