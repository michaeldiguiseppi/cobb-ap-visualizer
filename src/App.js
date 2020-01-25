import React, {useState} from 'react';
import AppRouter from './router';
import withFirebaseAuth, { WrappedComponentProps } from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import AuthModal from './AuthModal/AuthModal';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.EmailAuthProvider(),
};



const App = ({user, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="App">
      <AppRouter />
      <AuthModal 
        user={user}
        createUserWithEmailAndPassword={createUserWithEmailAndPassword}
        signInWithEmailAndPassword={signInWithEmailAndPassword}
        signOut={signOut}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
