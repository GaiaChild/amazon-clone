import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBmI689EKIbZt1UBfkh8EAOdkm-m-RffhA",
  authDomain: "clone-85b6f.firebaseapp.com",
  projectId: "clone-85b6f",
  storageBucket: "clone-85b6f.appspot.com",
  messagingSenderId: "154672522976",
  appId: "1:154672522976:web:58db58def426e364ab5285",
  measurementId: "G-GKXMVT358M"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export {db, auth};