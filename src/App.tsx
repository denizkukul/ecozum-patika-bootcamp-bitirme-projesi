import { useAppSelector } from './hooks/useAppSelector';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RegisterPage } from './routes/RegisterPage';
import { BoardListPage } from './routes/BoardListPage';
import { BoardContentPage } from './routes/BoardContentPage';
import { RequireAuth } from './components/RequireAuth';
import { LoginPage } from './routes/LoginPage';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      dark: blueGrey[800],
      main: blueGrey[500],
      light: blueGrey[200],
    },
    secondary: {
      main: blueGrey[50],
    }
  },
});

const App: React.FC = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<Navigate to={auth.userID ? `user${auth.userID}` : 'login'} />} />
            <Route path='login' element={auth.userID ? <Navigate to={`user${auth.userID}`} /> : <LoginPage />} />
            <Route path='register' element={auth.userID ? <Navigate to={`user${auth.userID}`} /> : <RegisterPage />} />
            <Route path='user:userID' element={<RequireAuth />}>
              <Route index element={<BoardListPage />} />
              <Route path='board:boardID' element={<BoardContentPage />} />
              <Route path='*' element={<Navigate to='' />} />
            </Route>
          </Routes>
        </BrowserRouter >
      </ThemeProvider>
    </CssBaseline>
  );
}

export default App;
