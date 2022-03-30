import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import { Loading } from '../components/Loading';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { login } from '../store/auth/authActions';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { LoginRequest } from '../services/server/controllers/auth/types';
import { Header } from '../components/Layout/Header';
import { Box } from '@mui/material';
import { AppContainer } from '../components/Layout/AppContainer';
import { Title } from '../components/Layout/Title';
import { Content } from '../components/Layout/Content';
import { ScrollContainer } from '../components/Layout/ScrollContainer';


export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const appStatus = useAppSelector(state => state.app.status);
  const handleLogin = (formValues: LoginRequest, authPersistence: boolean) => {
    dispatch(login({ data: formValues, authPersistence }));
  }

  return (
    appStatus === 'idle' ?
      <AppContainer>
        <Header>
          <Title main>Scrumboard App</Title>
        </Header>
        <Content>
          <ScrollContainer>
            <LoginForm onSubmit={handleLogin}>
              <Box display='flex' my={2}>
                <Typography mr={2}>Dont have an account ? </Typography>
                <Typography color='primary'>
                  <Link to='/register'>Register</Link>
                </Typography>
              </Box>
            </LoginForm>
          </ScrollContainer>
        </Content>
      </AppContainer> :
      <Loading />
  )
}