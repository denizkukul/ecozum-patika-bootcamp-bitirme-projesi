import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom'
import { Header } from '../components/Header';
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
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', overflow: 'auto' }}>
        <Header>
          <Typography color='primary' sx={{ fontFamily: 'Poppins', fontSize: '30px', fontWeight: '700', textAlign: 'center', flex: 1 }}>Scrumboard App</Typography>
        </Header>
        <Box sx={{ flex: 1, p: 4 }}>
          <RegisterForm onSubmit={handleRegister}>
            <Box display='flex' my={2}>
              <Typography mr={2}>Already have an account ? </Typography>
              <Typography color='primary' ><Link to='/login'>Login</Link></Typography>
            </Box>
          </RegisterForm>
        </Box>
      </Box> :
      <Loading />
  )
}