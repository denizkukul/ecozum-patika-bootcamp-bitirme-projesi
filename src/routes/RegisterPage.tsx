import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom'
import { Header } from '../components/Layout/Header';
import { Loading } from '../components/Loading';
import { RegisterForm } from '../components/RegisterForm/RegisterForm';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { RegisterRequest } from '../services/server/controllers/auth/types';
import { register } from '../store/auth/authActions';

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(state => state.auth.status);
  const handleRegister = (formValues: RegisterRequest) => {
    dispatch(register({ data: formValues }));
  }

  return (
    authStatus === 'idle' ?
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', overflow: 'auto' }}>
        <Header>
          <Typography color='primary.contrastText' sx={{ fontFamily: 'Poppins', fontSize: '30px', fontWeight: '700', textAlign: 'center', flex: 1 }}>Scrumboard App</Typography>
        </Header>
        <Box bgcolor='primary.light' sx={{ flex: 1, p: 4 }}>
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