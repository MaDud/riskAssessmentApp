import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6Tfh2KFGCUXVLxbx_TmxoHKvUBHaTe-A",
    authDomain: "riskassessmentapp.firebaseapp.com",
    databaseURL: "https://riskassessmentapp.firebaseio.com",
    projectId: "riskassessmentapp",
    storageBucket: "riskassessmentapp.appspot.com",
    messagingSenderId: "127189732188",
    appId: "1:127189732188:web:707d740c037e015c874f99"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase.firestore().settings({timestampsInSnapshots: true})

export default firebase;
