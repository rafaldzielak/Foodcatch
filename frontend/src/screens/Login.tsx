import { useMutation } from "@apollo/client";
import { useState } from "react";
import FadeIn from "react-fade-in";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import "../components/address.scss";
import Alert from "../components/Alert";
import { User } from "../models/user";
import { loginUserMutation } from "../queries/authQueries";
import { loginUserAction } from "../state/actions/AuthActions";
import "./order-screen.scss";

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
        const { email, isAdmin, jwt } = data?.loginUser as User;
        if (data) dispatch(loginUserAction({ email, isAdmin, jwt }));
        history.push(`/`);
      })
      .catch((error) => setLoginError(error.message));
  };

  const showLoginFields = () => (
    <div className='address'>
      <Helmet>
        <title>Login | Admin | FoodCatch</title>
      </Helmet>
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
