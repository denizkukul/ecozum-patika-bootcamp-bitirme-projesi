import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import { Loading } from '../components/Loading';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { Header } from '../components/Layout/Header';
import { Box } from '@mui/material';
import { AppContainer } from '../components/Layout/AppContainer';
import { Title } from '../components/Layout/Title';
import { Content } from '../components/Layout/Content';
import { ScrollContainer } from '../components/Layout/ScrollContainer';
import { clearErrors } from '../store/status/statusReducer';


export const LoginPage = () => {
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
            <LoginForm>
              <Box display='flex' my={2}>
                <Typography mr={2}>Dont have an account ? </Typography>
                <Typography color='primary'>
                  <Link onClick={handleClearErrors} to='/register'>Register</Link>
                </Typography>
              </Box>
            </LoginForm>
          </ScrollContainer>
        </Content>
      </AppContainer> :
      <Loading />
  )
}