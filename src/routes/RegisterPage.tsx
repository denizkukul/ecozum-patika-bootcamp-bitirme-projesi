import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom'
import { AppContainer } from '../components/Layout/AppContainer';
import { Content } from '../components/Layout/Content';
import { Header } from '../components/Layout/Header';
import { ScrollContainer } from '../components/Layout/ScrollContainer';
import { Title } from '../components/Layout/Title';
import { Loading } from '../components/Loading';
import { RegisterForm } from '../components/RegisterForm/RegisterForm';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { RegisterRequest } from '../services/server/controllers/auth/types';
import { register } from '../store/auth/authActions';

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const appStatus = useAppSelector(state => state.app.status);
  const handleRegister = (formValues: RegisterRequest) => {
    dispatch(register({ data: formValues }));
  }

  return (
    appStatus === 'idle' ?
      <AppContainer>
        <Header>
          <Title main>Scrumboard App</Title>
        </Header>
        <Content>
          <ScrollContainer>
            <RegisterForm onSubmit={handleRegister}>
              <Box display='flex' my={2}>
                <Typography mr={2}>Already have an account ? </Typography>
                <Typography color='primary' >
                  <Link to='/login'>Login</Link>
                </Typography>
              </Box>
            </RegisterForm>
          </ScrollContainer>
        </Content>
      </AppContainer> :
      <Loading />
  )
}