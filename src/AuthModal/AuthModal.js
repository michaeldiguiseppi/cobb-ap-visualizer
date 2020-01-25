import React from 'react';
import Modal from '@material-ui/core/Modal';
import LoginPage from './LoginPage';

const AuthModal = ({user, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, open, setOpen}) => {
  console.warn('yeet signInWithEmailAndPassword, signOut', signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword);
  console.warn('yeet user', user);

  const handleOpenModal = () => {
    setOpen(true);
  }

  const handleCloseModal = () => {
    setOpen(false);
  }

  return (
    <div className="App">
      <Modal
        open={open}
        onClose={handleCloseModal}
      >
        <div style={{
          backgroundColor: 'black',
          width: '50vw',
          height: '50vh',
        }}>
          <LoginPage signIn={signInWithEmailAndPassword} signOut={signOut} />
        </div>

      </Modal>
      <button onClick={handleOpenModal}>modal</button>
    </div>
  );
}

export default AuthModal;