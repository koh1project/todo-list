import React, { FC, useState } from 'react';
import FormInput from '../form-input/form-input';

const SignIn: FC = (props) => {
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

  const handleSubmit = (evt: React.FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    console.log(userCredentials);
    // TODO: Login to firebase
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
