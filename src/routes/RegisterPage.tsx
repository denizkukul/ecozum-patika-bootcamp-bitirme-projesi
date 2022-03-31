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
import { clearErrors } from '../store/status/statusReducer';

export const RegisterPage = () => {
  const appStatus = useAppSelector(state => state.status.appStatus);
  const dispatch = useAppDispatch()

  const handleClearErrors = () => {
    dispatch(clearErrors());
  }

  return (
    appStatus === 'idle' ?
      <AppContainer>
        <Header>
          <Title main>Scrumboard App</Title>
        </Header>
        <Content>
          <ScrollContainer>
            <RegisterForm>
              <Box display='flex' my={2}>
                <Typography mr={2}>Already have an account ? </Typography>
                <Typography color='primary' >
                  <Link onClick={handleClearErrors} to='/login'>Login</Link>
                </Typography>
              </Box>
            </RegisterForm>
          </ScrollContainer>
        </Content>
      </AppContainer> :
      <Loading />
  )
}