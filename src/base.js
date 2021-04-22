import Rebase from 're-base';
import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDnf-kSH5CE4SPEV4zd3VBfLjiNd804zBI",
  authDomain: "groupus-c79d9.firebaseapp.com",
  databaseURL: "https://groupus-c79d9.firebaseio.com",
  projectId: "groupus-c79d9",
  storageBucket: "groupus-c79d9.appspot.com",
  messagingSenderId: "1031496881060"
};

const firebaseApp = firebase.initializeApp(config);
const base = Rebase.createClass(firebaseApp.database());
const auth = base.initializedApp.auth();

export {
	base,
  	auth,
};
