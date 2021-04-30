import './App.css';
import firebaseConfig from './firebase.config';
import firebase from "firebase/app";
import "firebase/auth";
import { useState } from 'react';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else{
  firebase.app();
}

function App() {
  const [user, setUser] = useState([]);
  var provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var ghProvider = new firebase.auth.GithubAuthProvider();

  const handleGoogleSignIn = () => {
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;
      var token = credential.accessToken;
      var user = result.user;
      console.log(user);
      setUser(user);
      // ...
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(errorCode, errorMessage, email, credential)
    });
  }
  const handleFacebookSignIn = () => {

  }
  const handleGithubSignIn = () => {
    firebase
  .auth()
  .signInWithPopup(ghProvider)
  .then((result) => {
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
    setUser(user);
    console.log ('gh user', user);
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorCode, errorMessage, email, credential);
  });
  }
  console.log(user)
  
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Sign in Google</button>
      <button onClick={handleFacebookSignIn}>Sign in Facebook</button>
     <button onClick={handleGithubSignIn}>Sign in Github</button>
      <h3>Users: {user.displayName}</h3>
      <img src={user.photoURL} alt=""/>
    </div>
  );
}

export default App;
