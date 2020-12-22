import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyDXHhRV8wWTwia872xU4GocI-lwxWtjw_Y",
    authDomain: "virtual-pet-fdc45.firebaseapp.com",
    databaseURL: "https://virtual-pet-fdc45.firebaseio.com",
    projectId: "virtual-pet-fdc45",
    storageBucket: "virtual-pet-fdc45.appspot.com",
    messagingSenderId: "1022588225452",
    appId: "1:1022588225452:web:026ef1ea20e32f74ab5c09"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();