import { Link } from "react-router-dom"
import { Loading } from "../components/Loading";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { login, selectAuth } from "../store/authSlice";
import { LoginForm } from "../components/LoginForm";
import { LoginRequest } from "../services/server/controllers/auth/types";


export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  const handleLogin = (formValues: LoginRequest, authPersistence: boolean) => {
    dispatch(login({ loginData: formValues, authPersistence }));
  }

  return (
    auth.status === 'idle' ?
      <div>
        <h2>Login Page</h2>
        <LoginForm onSubmit={handleLogin} />
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <div>Dont have an account ?</div>
          <Link to='/register'>
            <div>Register Here</div>
          </Link>
        </div>
      </div > :
      <Loading />
  )
}