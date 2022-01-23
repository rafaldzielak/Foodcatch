import { useState } from "react";
import { useHistory } from "react-router";
import Alert from "../components/Alert";
import FadeIn from "react-fade-in";
import "../components/address.scss";
import "./order-screen.scss";
import { useMutation } from "@apollo/client";
import { loginUserMutation } from "../queries/authQueries";
import { User } from "../models/user";
import { useDispatch } from "react-redux";
import { loginUserAction } from "../state/actions/AuthActions";

const LoginScreen = () => {
  const [loginError, setLoginError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUserMut] = useMutation<{ loginUser: User }>(loginUserMutation);
  const dispatch = useDispatch();

  const history = useHistory();

  const handleLoginUser = () => {
    loginUserMut({ variables: { email, password } })
      .then(({ data }) => {
        const { email, isAdmin } = data?.loginUser as User;
        if (data) dispatch(loginUserAction({ email, isAdmin }));
        history.push(`/`);
      })
      .catch((error) => setLoginError(error.message));
  };

  const showLoginFields = () => (
    <div className='address'>
      <h1>Sign in</h1>
      {loginError && (
        <FadeIn>
          <Alert hideCloseBtn>{loginError}</Alert>
        </FadeIn>
      )}
      <form>
        <div className='form-row mb-2'>
          <label htmlFor='email'>Email: </label>
          <input
            type='text'
            placeholder='Email'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}></input>
        </div>
        <div className='form-row'>
          <label htmlFor='password'>Password: </label>
          <input
            type='password'
            placeholder='Password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}></input>
        </div>
      </form>
    </div>
  );

  return (
    <div className='container narrow mt-2'>
      {showLoginFields()}
      <button onClick={handleLoginUser} className='wide big'>
        Sign in
      </button>
    </div>
  );
};

export default LoginScreen;
