import { Link } from "react-router-dom"
import { Loading } from "../components/Loading";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { login, selectAuth } from "../store/authSlice";
import { LoginForm } from "../components/LoginForm";
import { LoginRequest } from "../services/server/controllers/auth/types";
import { Header } from "../components/Header";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";


export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  const handleLogin = (formValues: LoginRequest, authPersistence: boolean) => {
    dispatch(login({ loginData: formValues, authPersistence }));
  }

  return (
    auth.status === 'idle' ?
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', overflow: 'auto' }}>
        <Header>
          <Typography color='primary' sx={{ fontFamily: 'Poppins', fontSize: '30px', fontWeight: '700', textAlign: 'center', flex: 1 }}>Scrumboard App</Typography>
        </Header>
        <Box sx={{ flex: 1, p: 4, width: '100%', display: 'flex', justifyContent: 'center' }}>
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