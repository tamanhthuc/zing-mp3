import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";
import 'firebase/compat/storage';

const config = {
  apiKey: 'AIzaSyBLR4nRVuEodf0_cWP4HerFqU6RXyx49Q0',
  authDomain: 'zingmp3-7c0d9.firebaseapp.com',
  databaseURL: 'https://zingmp3-7c0d9-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'zingmp3-7c0d9',
  storageBucket: 'zingmp3-7c0d9.appspot.com',
  messagingSenderId: '735457854755',
  appId: '1:735457854755:web:e80dfc673803fd62d47896',
  measurementId: 'G-29D28ZEXNC',
};

!firebase.apps.length
 ? firebase.initializeApp(config).firestore()
: firebase.app().firestore();
var db = firebase.firestore();
export default db


