import { Link } from 'react-router-dom'
import { Loading } from '../components/Loading';
import { RegisterForm } from '../components/RegisterForm';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { RegisterRequest } from '../services/server/controllers/auth/types';
import { register, selectAuth } from '../store/authSlice';

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const handleRegister = (formValues: RegisterRequest) => {
    dispatch(register(formValues));
  }

  return (
    auth.status === 'idle' ?
      <div>
        <h2>Register Page</h2>
        <RegisterForm onSubmit={handleRegister} />
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <div>Already have an account ?</div>
          <Link to='/login'>
            <div>Login Here</div>
          </Link>
        </div>
      </div> :
      <Loading />
  )
}