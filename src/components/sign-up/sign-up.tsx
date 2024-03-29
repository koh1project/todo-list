import FormInput from 'components/form-input/form-input';
import React, { VFC } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { auth, createUserProfileDocument } from 'firebase/firebase.utils';
import { setCurrentUser } from '../../redux/user/user.actions';
import { isFirebaseError } from '../../firebase/firebase.utils';

import './sign-up.scss';

const SignUp: VFC = () => {
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

  const history = useHistory();

  const handleSubmit = async (evt: React.FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setError('');

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      user && (await createUserProfileDocument(user));
      if (user) {
        dispatch(setCurrentUser(user.uid));
        history.push('/');
      }
    } catch (error: unknown) {
      if (isFirebaseError(error)) {
        setError(error.message);
      }
    }
  };

  return (
    <div>
      <h3>Sign Up</h3>
      {error}
      <form>
        <FormInput
          name="email"
          type="text"
          value={email}
          handleChange={handleChange}
          label="email"
          className="signup-input"
        ></FormInput>
        <FormInput
          name="password"
          type="password"
          handleChange={handleChange}
          value={password}
          label="password"
          className="signup-input"
        />
        <input type="submit" value="Sign Up" onClick={(evt) => handleSubmit(evt)} className="sign-up-btn" />
      </form>
    </div>
  );
};

export default SignUp;
