import React, { useState } from 'react';
import FormInput from '../../components/form-input/form-input';

const Login = () => {
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

  const loginHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    console.log(userCredentials);
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
      <input type="submit" value="submit" onClick={(evt) => loginHandler(evt)} />
    </div>
  );
};

export default Login;
