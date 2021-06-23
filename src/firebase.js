import firebase from 'firebase';

const firebaseApiKey = process.env.REACT_APP_FIREBASE_APIKEY;

var firebaseConfig = {
    apiKey: firebaseApiKey,
    authDomain: "disney-clone-347ff.firebaseapp.com",
    projectId: "disney-clone-347ff",
    storageBucket: "disney-clone-347ff.appspot.com",
    messagingSenderId: "1029272355284",
    appId: "1:1029272355284:web:f502dbe6f60fc2dc6c1641",
    measurementId: "G-HD9PP7L1HV"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;