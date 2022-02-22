import SignIn from 'components/sign-in/sign-in';
import SignUp from 'components/sign-up/sign-up';

import './login.scss';

export const Login = () => {
  // @TODO: Sign up component
  // @TODO: Use UI component

  return (
    <div className='login-page'>
      <h1>Login page</h1>
      <SignIn />
      <SignUp />
    </div>
  );
};
