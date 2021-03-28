import React, { VFC, useState } from 'react';
import { auth } from 'firebase/firebase.utils';
import FormInput from '../form-input/form-input';
import { setCurrentUser } from '../../redux/user/user.actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

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

  const history = useHistory();

  const handleSubmit = async (evt: React.FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    console.log(userCredentials);
    // TODO: Login to firebase
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);

      if (user) {
        dispatch(setCurrentUser(user.uid));
        history.push('/');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  //@TODO: 制作用メソッド
  const TestHandleSubmit = async (evt: React.FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    console.log(userCredentials);

    const { user } = await auth.signInWithEmailAndPassword('test@gmail.com', 'aaaaaa');
    if (user) {
      dispatch(setCurrentUser(user.uid));
      history.push('/');
    }
  };

  return (
    <div>
      {error}
      <FormInput name="email" type="text" value={email} handleChange={handleChange} label="email"></FormInput>
      <FormInput
        name="password"
        type="password"
        handleChange={handleChange}
        value={password}
        label="password"
      ></FormInput>
      <div>
        <input type="submit" value="TestSubmit" onClick={(evt) => TestHandleSubmit(evt)} />
        <input type="submit" value="submit" onClick={(evt) => handleSubmit(evt)} />
      </div>
      <div>
        <button>google signin</button>
      </div>
    </div>
  );
};

export default SignIn;
