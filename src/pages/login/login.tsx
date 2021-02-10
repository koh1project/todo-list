import React, { useState } from 'react';

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
      <input
        name="email"
        type="text"
        onChange={(evt) => {
          handleChange(evt);
        }}
        value={email}
      ></input>
      <input
        name="password"
        type="password"
        onChange={(evt) => {
          handleChange(evt);
        }}
        value={password}
      ></input>
      <input type="submit" value="submit" onClick={(evt) => loginHandler(evt)} />
    </div>
  );
};

export default Login;
