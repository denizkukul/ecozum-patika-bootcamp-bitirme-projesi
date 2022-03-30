import { Link } from 'react-router-dom'
import { Loading } from '../components/Loading';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { login } from '../store/auth/authActions';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { LoginRequest } from '../services/server/controllers/auth/types';
import { Header } from '../components/Layout/Header';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';


export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const appStatus = useAppSelector(state => state.app.status);
  const handleLogin = (formValues: LoginRequest, authPersistence: boolean) => {
    dispatch(login({ data: formValues, authPersistence }));
  }

  return (
    appStatus === 'idle' ?
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', overflow: 'auto', minHeight: '100vh' }}>
        <Header>
          <Typography color='primary.contrastText' sx={{ fontFamily: 'Poppins', fontSize: '30px', fontWeight: '700', textAlign: 'center', flex: 1 }}>Scrumboard App</Typography>
        </Header>
        <Box bgcolor='primary.light' sx={{ flex: 1, p: 4, width: '100%', display: 'flex', justifyContent: 'center' }}>
          <LoginForm onSubmit={handleLogin}>
            <Box display='flex' my={2}>
              <Typography mr={2}>Dont have an account ? </Typography>
              <Typography color='primary'><Link to='/register'>Register</Link></Typography>
            </Box>
          </LoginForm>
        </Box>
      </Box> :
      <Loading />
  )
}