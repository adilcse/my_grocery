 
import * as firebase from "firebase";
import "firebase/auth";
import {firebaseConfig} from "./firebaseConfig";
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const storage = firebase.storage();
  export {db,storage,firebase};
  //