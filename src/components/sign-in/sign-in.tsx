import React, { VFC, useState } from 'react';
import { auth, signInWithGoogle } from 'firebase/firebase.utils';
import FormInput from '../form-input/form-input';
import { setCurrentUser } from '../../redux/user/user.actions';
import { useDispatch } from 'react-redux';
import { isFirebaseError } from '../../firebase/firebase.utils';

import './sign-in.scss';

const SignIn: VFC = () => {
  const dispatch = useDispatch();
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });
  const { email, password } = userCredentials;
  const [error, setError] = useState('');

  const handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setError('');

    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      if (user) {
        dispatch(setCurrentUser(user.uid));
      }
    } catch (error: unknown) {
      if (isFirebaseError(error)) {
        setError(error.message);
      }
    }
  };

  //@TODO: 制作用メソッド
  const TestHandleSubmit = async (evt: React.FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    console.log(userCredentials);

    const { user } = await auth.signInWithEmailAndPassword('test@gmail.com', 'aaaaaa');
    if (user) {
      dispatch(setCurrentUser(user.uid));
    }
  };

  return (
    <div>
      <h3>Sign In</h3>
      {error}
      <FormInput
        name="email"
        type="text"
        value={email}
        handleChange={handleChange}
        label="email"
        className="signin-input"
      ></FormInput>
      <FormInput
        name="password"
        type="password"
        handleChange={handleChange}
        value={password}
        label="password"
        className="signin-input"
      ></FormInput>
      <div>
        <input type="submit" value="Sign In" onClick={(evt) => handleSubmit(evt)} className="sign-in-btn" />
      </div>
      <div>
        <button onClick={signInWithGoogle} className="sign-in-btn">
          Sign In with Google Account
        </button>
        <input
          type="submit"
          value="Test User Sign In"
          onClick={(evt) => TestHandleSubmit(evt)}
          className="test-sign-in"
        />
      </div>
    </div>
  );
};

export default SignIn;
