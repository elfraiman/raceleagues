import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/performance";

const firebaseConfig = {
  apiKey: "AIzaSyAG2_dji58CcFOwWqjQXrATBOtGPSjc4iY",
  authDomain: "spoolracing.firebaseapp.com",
  databaseURL: "https://spoolracing.firebaseio.com",
  projectId: "spoolracing",
  storageBucket: "spoolracing.appspot.com",
  messagingSenderId: "335755757541",
  appId: "1:335755757541:web:baaa5fd2ab4578429b510c",
  measurementId: "G-R0WN3TM0QP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.performance();

export default firebase;