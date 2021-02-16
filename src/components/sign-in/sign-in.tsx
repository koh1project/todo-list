import React, { FC, useState } from 'react';
import { auth } from 'src/firebase/firebase.utils';
import FormInput from '../form-input/form-input';
import { setCurrentUser } from '../../redux/user/user.actions';
import { UserState } from 'src/redux/user/user.reducer';
import { useDispatch } from 'react-redux';
import { UserActionTypes } from 'src/redux/user/user.types';

const SignIn: FC = (props) => {
  const dispatch = useDispatch();
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: ''
  });
  const { email, password } = userCredentials;
  const handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    console.log(userCredentials);
    // TODO: Login to firebase
    // const { user } = await auth.signInWithEmailAndPassword(email,password);
    const { user } = await auth.signInWithEmailAndPassword('test@gmail.com', 'aaaaaa');
    console.log(user);
    dispatch(setCurrentUser(user!.uid));
  };

  return (
    <div>
      <FormInput name="email" type="text" value={email} handleChange={handleChange} label="email"></FormInput>
      <FormInput
        name="password"
        type="password"
        handleChange={handleChange}
        value={password}
        label="password"
      ></FormInput>
      <input type="submit" value="submit" onClick={(evt) => handleSubmit(evt)} />
      <button>google signin</button>
    </div>
  );
};

export default SignIn;
